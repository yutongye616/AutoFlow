# AutoFlow

AutoFlow is an application that manages both the service and sales operations of an automotive service and sales center. It handles automobile inventory—including make, model, and VIN—as well as service appointments, technicians, customers, sales transactions, salespeople, and vehicle purchase records.

#### Team:

* Gabe Wickert - Sales
* Yutong Ye - Service

#### Project Set up 💻

1.Fork the repo at https://github.com/yutongye616/AutoFlow.git

2.Clone your fork to your projects directory.

3.Change directory into the repository directory.

4.Run the follwing commands to set up docker envirnment 

```
docker volume create beta-data
docker compose build
docker compose up
```
 5.Enter "localhost:3000" in your web browser to see the front-end of the React app in action, showcasing its dynamic and interactive features.

### Project Diagram


---

### 🔹 Frontend (React)

The frontend is built with **React** and serves as the unified user interface for inventory management, service scheduling, and sales operations.  
It communicates with backend services exclusively through **RESTful JSON APIs**, ensuring a clean separation of concerns.

---

### 🔹 Inventory Microservice (Source of Truth)

The **Inventory microservice** owns all vehicle-related data and serves as the **source of truth** for:

- Automobiles (VIN)
- Manufacturers
- Models
- Sold status

It exposes read-only endpoints that allow other services to retrieve VIN and sold information without directly coupling to the inventory database.

**Database:** Inventory DB  
**Responsibility:** Vehicle lifecycle and availability

---

### 🔹 Service Microservice

The **Service microservice** manages all service-related operations, including:

- Service appointments
- Technicians
- Service history

It maintains a local read-only copy of vehicle VIN data using a **polling mechanism** that periodically fetches VIN information from the Inventory microservice. This design enables **eventual consistency** while preserving service autonomy.

**Database:** Service DB  
**Responsibility:** Scheduling, technicians, and service records

---

### 🔹 Sales Microservice

The **Sales microservice** manages the vehicle sales workflow, including:

- Customers
- Salespeople
- Sales transactions

Similar to the Service microservice, it uses a **poller** to retrieve VIN and sold status data from the Inventory microservice, ensuring sales logic remains decoupled from inventory ownership.

**Database:** Sales DB  
**Responsibility:** Customer management and sales transactions

---

### 🔹 Data Synchronization Strategy

- Inventory is the **single source of truth** for vehicle data.
- Service and Sales microservices maintain **local value objects (VOs)** for VIN and sold status.
- Pollers run at scheduled intervals to synchronize data.
- This design supports **loose coupling**, **scalability**, and **fault isolation**.

---

### 🔹 Architectural Principles

- Microservices with independent databases
- RESTful API communication
- Eventual consistency via polling
- Clear data ownership boundaries
- Frontend-backend separation

---

<img
  width="900"
  alt="System Architecture Diagram"
  src="https://github.com/user-attachments/assets/c2474f78-e73e-4288-9c2b-49b3f7ff9113"
/>



## Service microservice

The Service microservice features three main models: Technician, AutomobileVo, and Appointment. Although there is an AutomobileVO model that includes a "vin" field within my models file, this field isn't linked as a Foreign Key to the "vin" field in the Appointment model. Within the service directory, there's a subdirectory named "poll," which contains a file called 'poller.py.' This file contains the logic for fetching necessary data (vin and sold fields) from the inventory microservice.

The primary goal of the Service microservice is to keep track of technicians, oversee the status of service appointments, and manage a service history record, enabling searches for appointments using a vehicle's vin number. Furthermore, it enhances functionality by allowing the addition of new technicians and providing an appointment scheduling form to streamline the process of setting up new appointments.

### Service API Endpoints

| Action | Method | URL
| ----------- | ----------- | ----------- |
| List Technicians | GET | `http://localhost:8080/api/technicians/`
| Create a Technician| POST | `http://localhost:8080/api/technicians/`
| Delete a Specific Technician| DELETE | `http://localhost:8080/api/technicians/<id>/`
| List Appointments | GET | `http://localhost:8080/api/appointments`
| Create a Appointment | POST | `http://localhost:8080/api/appointments`
| Delete a Specific Appointment | DELETE | `http://localhost:8080/api/appointments/<id>/`

### Technicians:
The Technician API provides three key endpoints to interact with technician data: GET, POST, and DELETE. These endpoints can be accessed using a web browser or API testing tools like Insomnia.

In the Technician system, each technician has a special number called an id that is given to them automatically to make sure they can be easily found and not mixed up with others. They also have fields for their first_name and last_name to know their full name. Lastly, there's an employee_id, which is a unique number the company uses to keep track of each technician for things like pay and work schedules.

The 'GET' request retrieve a list of technicians, use the following URL:
http://localhost:8080/api/technicians/ This 'GET' request does not require a JSON body. Upon submission, you will receive a list of technicians with automatically generated id.


```python

Example Response Returned:
{
	"id": 1,
	"first_name": "John",
	"last_name": "Ye",
	"employee_id": 123
}
```


The 'POST' request add a new technician to the system, use the URL: http://localhost:8080/api/technicians/

To create a new technician:
```python
Example JSON Body:

{
    "first_name":"Yutong",
    "last_name":"Ye",
    "employee_id":123
}

Example Response Returned:

{
	"id": 1,
	"first_name": "Yutong",
	"last_name": "Ye",
	"employee_id": 123
}
```

In the above setup, each technician has a special number called an id that is given to them automatically to make sure they can be easily found and not mixed up with others. They also have fields for their first_name and last_name to know their full name. Lastly, there's an employee_id, which is a unique number the company uses to keep track of each technician for things like pay and work schedules.

The 'DELETE' method delete a technician: http://localhost:8080/api/technicians/id/

To remove a technician from the system, you only need the technician's unique ID. Substitute id in the URL with the actual ID of the technician. 


```python
Example Response Returned:
{
	"message": "Technician has been deleted"
}
```


### Appointments:
The Appointment API offers three primary endpoints for managing appointment data: GET, POST, and DELETE. 

In the Appointment system, each service appointment is uniquely identified (id) and includes essential details like the appointment time (date_time), reason (service_reason), and customer name. It's linked to a vehicle (vin) and indicates if the customer is a priority (vip). The assigned technician is identified by an ID, streamlining the scheduling process. This setup efficiently organizes appointments, ensuring accurate service delivery and customer satisfaction, with the system providing concise records of each service event.

The 'GET' request retrieve a list of appointments, use the following URL:
http://localhost:8080/api/appointments/ This 'GET' request does not require a JSON body. Upon submission, you will receive a list of appointments with automatically generated id.

```python
Example JSON Body Returned:
{
	"appointments": [
		{
			"id": 2,
			"vin": "1HGBH41JXMN109186",
			"vip": false,
			"date_time": "2024-02-10T14:00:00+00:00",
			"customer": "Jane Smith",
			"service_reason": "Regular maintenance",
			"status": "Scheduled",
			"techname": "John Ye"
		}
	]
}
```

The 'POST' request add a new appointments to the system, use the URL: http://localhost:8080/api/appointments/

To create a new appointments:
```python
Example JSON Body:
{
  "date_time": "2024-02-10T14:00:00Z",
  "service_reason": "Regular maintenance",
  "status": "Scheduled",
  "vin": "1HGBH41JXMN109186",
  "customer": "Jane Smith",
  "vip": true,
  "technician": 2
}

Example Response Returned:
{
	"appointments": [
		{
			"id": 2,
			"vin": "1HGBH41JXMN109186",
			"vip": false,
			"date_time": "2024-02-10T14:00:00+00:00",
			"customer": "Jane Smith",
			"service_reason": "Regular maintenance",
			"status": "Scheduled",
			"techname": "John Ye"
		}
	]
}
```

The 'DELETE' method delete an appointment: http://localhost:8080/api/appointments/id/

To remove an appointment from the system, you only need the technician's unique ID. Substitute id in the URL with the actual ID of the appointment. 


```python
Example Response Returned:
{
	"message": "Appointment has been deleted."
}
```



## Sales microservice

The Sales microservice contains 4 Models;
AutomobileVO, which takes the vin and the sold property from the Inventory model "Automobile",
Customer, which is used to demonstate a potential customer for purchasing a vehicle,
Salesperson, which represents the staff that is making a sale on the vehicles on the lot,
Sale, which is used to keep track of sales that have occurred.

AutomobileVO is updated by the poller, which pulls the VIN and "Sold" factor from the Automobiles in inventory every 60 seconds.

If you are using Insomnia, here are all of the directly possible methods that can be used with the views inside of the Sales microservice (otherwise these are completed using the front-end interface):

| Action | Method | URL
| ----------- | ----------- | ----------- |
| List Customers | GET | `http://localhost:8090/api/customers/`
| Create a Customer | POST | `http://localhost:8090/api/customers/`
| Delete a Specific Customer | DELETE | `http://localhost:8090/api/customers/<id>/`
| List Salespeople | GET | `http://localhost:8090/api/salespeople/`
| Create a Salesperson | PUT | `http://localhost:8090/api/salespeople/`
| Delete a Specific Salesperson | DELETE | `http://localhost:8100/api/salespeople/<id>/`
| List Sales | GET | `http://localhost:8090/api/sales/`
| Create a Sale | POST | `http://localhost:8090/api/sales/`
| Delete a Specific Sale | DELETE | `http://localhost:8090/api/sales/<id>/`

Please be aware that the Delete functions have not yet been implemented into the code for the front-end.

In order to submit a Create, please follow the following guidelines (when using a JSON BODY):
Create Customer:
```python
{
	"first_name": "Josh",
	"last_name": "Elder",
	"address": "69420 Capitol Hill, Seattle, WA 98102",
	"phone_number": "1231231234"
}
```
The return value will be the same as the input with the addition of an "id" property.

```python
Create Salesperson:
{
	"first_name": "Jaik",
	"last_name": "Ascher",
	"employee_id": "jascher"
}
The employee_id consists of the first name inital, followed by the last name in lowercase. The return value will be the same as the input, with the addition of an "id" property.
```
```python
Create a Sale:
{
	"price": 1000000,
	"automobile": "1D7HA18N33J33J665",
	"salesperson": "jascher",
	"customer": "Josh"
}
```
Please be aware, that these parameters are specifically the Automobile VIN (17 Characters), the Salesperson Employee ID, Price, and the Customer's First Name.

```python
The resulting output:
{
	"id": 16,
	"price": 1000000,
	"automobile": {
		"id": 4,
		"vin": "1D7HA18N33J33J665",
		"sold": false
	},
	"salesperson": {
		"id": 5,
		"first_name": "Jaik",
		"last_name": "Ascher",
		"employee_id": "jascher"
	},
	"customer": {
		"id": 4,
		"first_name": "Josh",
		"last_name": "Elder",
		"address": "69420 Capitol Hill, Seattle, WA 98102",
		"phone_number": "1231231234"
	}
}
```

For deleting any of these, simply add the id of that particular sale, salesperson, or customer to the end of your url, and submit as a DELETE request.

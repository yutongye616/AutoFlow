# CarCar

CarCar is an application that handles both the services and sales aspects of an automotive service and sales center. CarCar manages the aspects of Automobile Inventory (Including Make, Model, and VIN) as well as the Service Appointments, Technicians, Customers, Sales, Salespeople, and the Customers who purchased vehicles.

#### Team:

* Gabe Wickert - Sales
* Yutong Ye - Service

#### Project Set up 💻

1. Fork the repo at https://gitlab.com/GabrielWickert/project-beta

2 .Clone your fork to your projects directory.

3. Change directory into the repository directory.

4. Run the following commands to set up Docker environment 

```
docker volume create beta-data
docker compose build
docker compose up
```
 5. Enter "localhost:3000" in your web browser to see the front-end of the React app in action, showcasing its dynamic and interactive features.

### Project Diagram

![Car Car Diagram](ProjectBeta.png)

## Service microservice

The Service microservice contains 3 Models;
Technicians represent service staff identified by a unique employee_id along with their name.
Appointments capture scheduled service requests with details such as VIN, customer name, date and time, reason for service, VIP status, and the assigned technician. 
AutomobileVO model is kept up to date by a poller that syncs the vehicle VIN and "sold" status from the Inventory microservice every 60 seconds.

### Service API Endpoints

| Action | Method | URL
| ----------- | ----------- | ----------- |
| List Technicians | GET | `http://localhost:8080/api/technicians/`
| Create a Technician| POST | `http://localhost:8080/api/technicians/`
| Delete a Specific Technician| DELETE | `http://localhost:8080/api/technicians/<id>/`
| List Appointments | GET | `http://localhost:8080/api/appointments`
| Create a Appointment | POST | `http://localhost:8080/api/appointments`
| Delete a Specific Appointment | DELETE | `http://localhost:8080/api/appointments/<id>/`

### The Technician API supports three operations:

GET http://localhost:8080/api/technicians
No body is required.
Example Get Response:
```
{
  "id": 1,
  "first_name": "John",
  "last_name": "Ye",
  "employee_id": 123
}
```

Create a Technician: 
POST http://localhost:8080/api/technicians
```
{
  "first_name": "Yutong",
  "last_name": "Ye",
  "employee_id": 123
}
```
Created a Technician Response:
```
{
  "id": 1,
  "first_name": "Yutong",
  "last_name": "Ye",
  "employee_id": 123
}
```
DELETE http://localhost:8080/api/technicians/<id>
Replace <id> with the technician's unique ID.
```
{
  "message": "Technician has been deleted"
}
```

### The Appointment API supports three operations:

GET http://localhost:8080/api/appointments
No body is required.
Example Get Response:
```
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

Create an Appointment:
POST http://localhost:8080/api/appointments
```
{
  "date_time": "2024-02-10T14:00:00Z",
  "service_reason": "Regular maintenance",
  "status": "Scheduled",
  "vin": "1HGBH41JXMN109186",
  "customer": "Jane Smith",
  "vip": true,
  "technician": 2
}
```
Created Appointment Response:
```
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

DELETE http://localhost:8080/api/appointments/<id>
Replace <id> with the appointment’s unique ID.

```
{
  "message": "Appointment has been deleted."
}
```



## Sales microservice

The Sales microservice contains 4 Models;
AutomobileVO, which takes the VIN and the sold property from the Inventory model "Automobile",
Customer, which is used to demonstrate a potential customer for purchasing a vehicle,
Salesperson, who represents the staff that is making a sale on the vehicles on the lot,
Sales are used to keep track of sales that have occurred.


### Sales API Endpoints

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


### The Customer API supports three operations:

GET http://localhost:8090/api/customers/
No request body required.
Example Response:
```
[
  {
    "id": 4,
    "first_name": "Josh",
    "last_name": "Elder",
    "address": "69420 Capitol Hill, Seattle, WA 98102",
    "phone_number": "1231231234"
  },
  {
    "id": 5,
    "first_name": "Jane",
    "last_name": "Smith",
    "address": "123 Main St, New York, NY 10001",
    "phone_number": "5555555555"
  }
]
```

To create a customer:
POST http://localhost:8090/api/customers/
```python
{
	"first_name": "Josh",
	"last_name": "Elder",
	"address": "69420 Capitol Hill, Seattle, WA 98102",
	"phone_number": "1231231234"
}
```
Created a Customer Response:
```python
{
  "id": 4,
  "first_name": "Josh",
  "last_name": "Elder",
  "address": "69420 Capitol Hill, Seattle, WA 98102",
  "phone_number": "1231231234"
}
```


To create a salesperson:
```python
Create Salesperson:
{
	"first_name": "Jaik",
	"last_name": "Ascher",
	"employee_id": "jascher"
}
```
Created a Salesperson Response:
```python 
{
  "id": 5,
  "first_name": "Jaik",
  "last_name": "Ascher",
  "employee_id": "jascher"
}
```

DELETE http://localhost:8090/api/customers/4/
Replace 4 with the actual customer ID you wish to delete.
Example Response:
```
{
  "message": "Customer has been deleted"
}
```

Get a List of Sales
GET http://localhost:8090/api/sales/
No request body required.
Example Response:
```
[
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
]
```

To create a sale: 
POST http://localhost:8090/api/sales/
```python
Create a Sale:
{
	"price": 1000000,
	"automobile": "1D7HA18N33J33J665",
	"salesperson": "jascher",
	"customer": "Josh"
}
```
Created a Sale Response:
```python
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
```

Delete a Sale
DELETE http://localhost:8090/api/sales/16/
Replace 16 with the actual sale ID you want to delete.

Example Response:
```
{
  "message": "Sale has been deleted"
}
```





# AutoFlow 🚗

AutoFlow is an application that handles both the service and sales side of an automotive service and sales center. It manages Automobile Inventory (make, model, and VIN), Service Appointments, Technicians, and the Customers, Salespeople, and Sales tied to vehicle purchases.

## Table of Contents

- [Team](#team)
- [Project Setup](#project-setup-)
- [Project Diagram](#project-diagram)
- [Service Microservice](#service-microservice)
  - [Service API Endpoints](#service-api-endpoints)
  - [Technicians](#technicians)
  - [Appointments](#appointments)
- [Sales Microservice](#sales-microservice)
  - [Sales API Endpoints](#sales-api-endpoints)
  - [Creating Records](#creating-records)

## Team

* Gabe Wickert — Sales
* Yutong Ye — Service

## Project Setup 💻

1. Fork the repo at https://github.com/yutongye616/AutoFlow
2. Clone your fork to your projects directory.
3. Change directory into the repository directory.
4. Run the following commands to set up the Docker environment:

   ```
   docker volume create beta-data
   docker compose build
   docker compose up
   ```

5. Open `localhost:3000` in your web browser to see the React front end in action.

## Project Diagram

![AutoFlow Diagram](ProjectBeta.png)

## Service Microservice

The Service microservice features three main models: `Technician`, `AutomobileVO`, and `Appointment`. The `AutomobileVO` model includes a `vin` field, but it isn't linked as a foreign key to the `vin` field on `Appointment`. Within the `service` directory, the `poll` subdirectory contains `poller.py`, which fetches the `vin` and `sold` fields from the inventory microservice.

The Service microservice keeps track of technicians, tracks the status of service appointments, and maintains a service history that can be searched by a vehicle's VIN. It also supports adding new technicians and scheduling new appointments.

### Service API Endpoints

| Action | Method | URL |
| --- | --- | --- |
| List Technicians | GET | `http://localhost:8080/api/technicians/` |
| Create a Technician | POST | `http://localhost:8080/api/technicians/` |
| Delete a Specific Technician | DELETE | `http://localhost:8080/api/technicians/<id>/` |
| List Appointments | GET | `http://localhost:8080/api/appointments/` |
| Create an Appointment | POST | `http://localhost:8080/api/appointments/` |
| Delete a Specific Appointment | DELETE | `http://localhost:8080/api/appointments/<id>/` |

### Technicians

The Technician API provides three endpoints: GET, POST, and DELETE. These can be accessed via a web browser or an API client like Insomnia.

Each technician has an auto-generated `id`, a `first_name` and `last_name`, and an `employee_id` — a unique number the company uses to track pay and work schedules.

**GET** `http://localhost:8080/api/technicians/`

No JSON body required. Returns a list of technicians.

```json
Example Response:
{
    "id": 1,
    "first_name": "John",
    "last_name": "Ye",
    "employee_id": 123
}
```

**POST** `http://localhost:8080/api/technicians/`

Creates a new technician.

```json
Example Request Body:
{
    "first_name": "Yutong",
    "last_name": "Ye",
    "employee_id": 123
}

Example Response:
{
    "id": 1,
    "first_name": "Yutong",
    "last_name": "Ye",
    "employee_id": 123
}
```

**DELETE** `http://localhost:8080/api/technicians/<id>/`

Removes a technician. Substitute `<id>` with the technician's unique ID.

```json
Example Response:
{
    "message": "Technician has been deleted"
}
```

### Appointments

The Appointment API offers three endpoints: GET, POST, and DELETE.

Each appointment has a unique `id` and includes the appointment time (`date_time`), reason (`service_reason`), and customer name. It's linked to a vehicle by `vin` and flags whether the customer is a priority (`vip`). The assigned technician is referenced by ID.

**GET** `http://localhost:8080/api/appointments/`

No JSON body required. Returns a list of appointments.

```json
Example Response:
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

**POST** `http://localhost:8080/api/appointments/`

Creates a new appointment.

```json
Example Request Body:
{
    "date_time": "2024-02-10T14:00:00Z",
    "service_reason": "Regular maintenance",
    "status": "Scheduled",
    "vin": "1HGBH41JXMN109186",
    "customer": "Jane Smith",
    "vip": true,
    "technician": 2
}

Example Response:
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

**DELETE** `http://localhost:8080/api/appointments/<id>/`

Removes an appointment. Substitute `<id>` with the appointment's unique ID.

```json
Example Response:
{
    "message": "Appointment has been deleted."
}
```

## Sales Microservice

The Sales microservice contains four models:

* **AutomobileVO** — mirrors the `vin` and `sold` fields from the Inventory microservice's `Automobile` model.
* **Customer** — a potential buyer of a vehicle.
* **Salesperson** — a staff member who sells vehicles on the lot.
* **Sale** — a record of a completed sale.

`AutomobileVO` is kept in sync by a poller that pulls the VIN and `sold` status from Inventory every 60 seconds.

The endpoints below can be called directly (e.g. with Insomnia); otherwise they're used through the front end.

### Sales API Endpoints

| Action | Method | URL |
| --- | --- | --- |
| List Customers | GET | `http://localhost:8090/api/customers/` |
| Create a Customer | POST | `http://localhost:8090/api/customers/` |
| Delete a Specific Customer | DELETE | `http://localhost:8090/api/customers/<id>/` |
| List Salespeople | GET | `http://localhost:8090/api/salespeople/` |
| Create a Salesperson | POST | `http://localhost:8090/api/salespeople/` |
| Delete a Specific Salesperson | DELETE | `http://localhost:8090/api/salespeople/<id>/` |
| List Sales | GET | `http://localhost:8090/api/sales/` |
| Create a Sale | POST | `http://localhost:8090/api/sales/` |
| Delete a Specific Sale | DELETE | `http://localhost:8090/api/sales/<id>/` |

> Delete functionality is not yet implemented in the front end.

### Creating Records

**Create Customer**

```json
{
    "first_name": "Josh",
    "last_name": "Elder",
    "address": "69420 Capitol Hill, Seattle, WA 98102",
    "phone_number": "1231231234"
}
```

The response mirrors the request with an added `id` property.

**Create Salesperson**

```json
{
    "first_name": "Jaik",
    "last_name": "Ascher",
    "employee_id": "jascher"
}
```

`employee_id` is the first initial followed by the lowercase last name. The response mirrors the request with an added `id` property.

**Create a Sale**

```json
{
    "price": 1000000,
    "automobile": "1D7HA18N33J33J665",
    "salesperson": "jascher",
    "customer": "Josh"
}
```

`automobile` is the vehicle's 17-character VIN, `salesperson` is the salesperson's employee ID, and `customer` is the customer's first name.

```json
Example Response:
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

To delete a sale, salesperson, or customer, append its `id` to the corresponding URL above and submit a DELETE request.

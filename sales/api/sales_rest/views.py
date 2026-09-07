from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
from .models import AutomobileVO, Sale, Salesperson, Customer

import json
from common.json import ModelEncoder

# ENCODERS
class AutomobileVOEncoder(ModelEncoder):
    model = AutomobileVO
    properties = [
        "id",
        "vin",
        "sold"
    ]

class SalespeopleListEncoder(ModelEncoder):
    model = Salesperson
    properties = [
        "id",
        "first_name",
        "last_name",
        "employee_id"
    ]


class CustomerListEncoder(ModelEncoder):
    model = Customer
    properties = [
        "id",
        "first_name",
        "last_name",
        "address",
        "phone_number"
    ]

class SalesListEncoder(ModelEncoder):
    model = Sale
    properties = [
        "id",
        "price",
        "automobile",
        "salesperson",
        "customer",
    ]
    encoders = {
    "automobile": AutomobileVOEncoder(),
    "customer": CustomerListEncoder(),
    "salesperson": SalespeopleListEncoder()
    }


# SALESPEOPLE
@require_http_methods(["GET", "POST"])
def api_list_salespeople(request):

    if request.method == "GET":
        salespeople = Salesperson.objects.all()
        return JsonResponse(
            {"salesperson": salespeople},
            encoder=SalespeopleListEncoder,
    )
    else:
        content = json.loads(request.body)
        salesperson = Salesperson.objects.create(**content)
        return JsonResponse(
            salesperson,
            encoder=SalespeopleListEncoder,
            safe=False,
        )

@require_http_methods(["GET", "PUT", "DELETE"])
def api_show_salesperson(request, pk):

   if request.method == "GET":
       salesperson = Salesperson.objects.get(id=pk)
       return JsonResponse(
           salesperson,
           encoder=SalespeopleListEncoder,
           safe=False,
       )
   elif request.method == "DELETE":
      count, _ = Salesperson.objects.filter(id=pk).delete()
      return JsonResponse({"deleted": count > 0})
   else:
        content = json.loads(request.body)
        Salesperson.objects.filter(id=pk).update(**content)
        salesperson = Salesperson.objects.get(id=pk)
        return JsonResponse(
            salesperson,
            encoder=SalespeopleListEncoder,
            safe=False,
        )

# CUSTOMERS
@require_http_methods(["GET", "POST"])
def api_list_customers(request):

    if request.method == "GET":
        customers = Customer.objects.all()
        return JsonResponse(
            {"customer": customers},
            encoder=CustomerListEncoder,
        )
    else:
        content = json.loads(request.body)
        customer = Customer.objects.create(**content)
        return JsonResponse(
            customer,
            encoder=CustomerListEncoder,
            safe=False,
        )

@require_http_methods(["GET", "PUT", "DELETE"])
def api_show_customer(request, pk):

   if request.method == "GET":
       customer = Customer.objects.get(id=pk)
       return JsonResponse(
           customer,
           encoder=CustomerListEncoder,
           safe=False,
       )
   elif request.method == "DELETE":
      count, _ = Customer.objects.filter(id=pk).delete()
      return JsonResponse({"deleted": count > 0})
   else:
        content = json.loads(request.body)
        Customer.objects.filter(id=pk).update(**content)
        customer = Customer.objects.get(id=pk)
        return JsonResponse(
            customer,
            encoder=CustomerListEncoder,
            safe=False,
        )

# SALES
@require_http_methods(["GET", "POST"])
def api_list_sales(request):

    if request.method == "GET":
        sales = Sale.objects.all()
        return JsonResponse(
            {"sale": sales},
            encoder=SalesListEncoder,
            safe=False
        )
    else:
        content = json.loads(request.body)
        try:
            automobile = AutomobileVO.objects.get(vin=content["automobile"])
            salesperson = Salesperson.objects.get(employee_id=content["salesperson"])
            customer = Customer.objects.get(first_name=content["customer"])
            sale = Sale.objects.create(
                price=content["price"],
                automobile=automobile,
                salesperson=salesperson,
                customer=customer
            )
            return JsonResponse(
                sale,
                encoder=SalesListEncoder,
                safe=False
            )
        except Exception as e:
            return JsonResponse({"message": str(e)}, status=400)

@require_http_methods(["GET", "DELETE"])
def api_show_sale(request, pk):

   if request.method == "GET":
       sale = Sale.objects.get(id=pk)
       return JsonResponse(
           sale,
           encoder=SalesListEncoder,
           safe=False,
       )
   else:
      count, _ = Sale.objects.filter(id=pk).delete()
      return JsonResponse({"deleted": count > 0})

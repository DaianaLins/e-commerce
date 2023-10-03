def productEntity(item) -> dict:
    return {
        "id": str(item["_id"]),
        "name": item["name"],
        "description": item["description"],
        "value": item["value"],
        "category": item["category"],
        "quantity": item["quantity"],
        "image": item["image"],
    }

def productsEntity(entity) -> list:
    return [productEntity(item) for item in entity]

from flask import Flask
from flask_app import app
from flask import render_template, redirect, request, session, jsonify
from flask_app.models import user, hack
import jsonpickle
from flask import Response


# Route to process new add data
@app.route("/api/hacks/new", methods=["POST"])
def process_new_hack():
    formData = request.get_json()
    print("FORM DATA: ", formData)
    # Display errors if not valid
    errors = hack.Hack.validate_hack_entry(formData)
    if len(errors) > 0:
        response = jsonify({"errors": errors})
    else:
        # Create a hack dictionary
        data = {
            "title": formData["title"],
            "category_id": formData["category_id"],
            "supplies": formData["supplies"],
            "instructions": formData["instructions"],
            "user_id": formData["user_id"]
        }
        # Call add hack method
        hack.Hack.add_hack(data)
        response = jsonify({"message":"hack successfully added"})
    return response


# Route to view all hacks
@app.route("/api/hacks/view")
def view_all_hacks():
    return Response(jsonpickle.encode(hack.Hack.get_all_hacks_with_category_and_user()), mimetype='application/json')
#Source for jsonpickle to serialize and deserialize data to JSON: http://jsonpickle.github.io/



# Route to view one hack
@app.route("/api/hacks/view/<int:num>")
def view_one_hack(num):
    data = {
        "id": num
    }
    return Response(jsonpickle.encode(hack.Hack.view_details(data)), mimetype='application/json')


# Route to update a hack
@app.route("/api/hacks/update/<int:num>", methods=["POST"])
def update_hack(num):
    formData = request.get_json()
    print("FORM DATA: ", formData)
    # Display errors if not valid
    errors = hack.Hack.validate_hack_entry(formData)
    if len(errors) > 0:
        response = jsonify({"errors": errors})
    else:
        # Create a hack dictionary
        data = {
            "id": num,
            "title": formData["title"],
            "category_id": formData["category_id"],
            "supplies": formData["supplies"],
            "instructions": formData["instructions"],
            "user_id": formData["user_id"]
        }
        # Call add hack method
        hack.Hack.update_hack(data)
        response = jsonify({"message":"hack successfully updated"})
    return response
    

# Route to delete a hack
@app.route("/api/hacks/delete/<int:num>", methods=["DELETE"])
def delete_hack(num):
    data = {
        "id": num
    }
    return Response(jsonpickle.encode(hack.Hack.delete_hack_record(data)), mimetype='application/json')

# Route to add favorite
@app.route("/api/hacks/favorite", methods=["POST"])
def add_to_favorite_list():
    formData = request.get_json()
    print("FORM DATA: ", formData)
    # Display errors if not valid
    # Create a hack dictionary
    data = {
        "user_id": formData["user_id"],
        "hack_id": formData["hack_id"]
    }
    # Call add hack method
    hack.Hack.add_favorite(data)
    response = jsonify({"message":"hack successfully favorited"})
    return response

# Route to view favorited hacks
@app.route("/api/hacks/view/favorites/<int:num>")
def view_favorite_hacks(num):
    # Create a hack dictionary
    data = {
        "user_id": num,
    }
    return Response(jsonpickle.encode(hack.Hack.get_all_favorited_hacks_with_category_and_user(data)), mimetype='application/json')
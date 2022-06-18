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
    errors = errors.hack.Hack.validate_hack_entry(formData)
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
@app.route("/api/hacks/update/<int:num>")
def update_hack(num):
    data = {
        "id": num
    }
    return Response(jsonpickle.encode(hack.Hack.update_hack(data)), mimetype='application/json')
    



# Route to delete a hack
@app.route("/api/hacks/delete/<int:num>", methods=["DELETE"])
def delete_hack(num):
    data = {
        "id": num
    }
    return Response(jsonpickle.encode(hack.Hack.delete_hack_record(data)), mimetype='application/json')

    
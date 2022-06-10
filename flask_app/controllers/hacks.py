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
    print(formData)
    # Redirect to dashboard if tree input is not valid
    #if not tree.hack.validate_hack_entry(formData):
    #    return redirect("/")
    # Create a hack dictionary
    data = {
        "title": formData["title"],
        "category_name": formData["category_name"],
        "supplies": formData["supplies"],
        "instructions": formData["instructions"],
        # "user_id": session["id"]
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
    pass



# Route to update a hack
@app.route("/api/hacks/update/<int:num>")
def update_hack(num):
    pass



# Route to delete a hack
@app.route("/api/hacks/delete/<int:num>")
def delete_hack(num):
    pass
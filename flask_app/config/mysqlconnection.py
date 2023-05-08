import pymysql.cursors
from flask_app import app
class MySQLConnection:
    def __init__(self, db):
        connection = None
        if hasattr(app,'connection'):
            app.logger.warning("LOCAL DB", app.connection)
            connection = pymysql.connect(host = app.connection['host'],
                                        user = app.connection['user'], # change the user and password as needed
                                        password = app.connection['password'] , 
                                        db = db,
                                        charset = 'utf8mb4',
                                        cursorclass = pymysql.cursors.DictCursor,
                                        autocommit = True)
        else:
            app.logger.warning("PROD DB")
            connection = pymysql.connect(host = 'katoltmans.mysql.pythonanywhere-services.com',
                                        user = 'katoltmans', # change the user and password as needed
                                        password = 'Ii1Vvx93nbMJ7yxvyLEmBBxt', 
                                        db = db,
                                        charset = 'utf8mb4',
                                        cursorclass = pymysql.cursors.DictCursor,
                                        autocommit = True)
        self.connection = connection
    def query_db(self, query, data=None):
        with self.connection.cursor() as cursor:
            try:
                query = cursor.mogrify(query, data)
                print("Running Query:", query)
    
                executable = cursor.execute(query, data)
                if query.lower().find("insert") >= 0:
                    # if the query is an insert, return the id of the last row, since that is the row we just added
                    self.connection.commit()
                    return cursor.lastrowid
                elif query.lower().find("select") >= 0:
                    # if the query is a select, return everything that is fetched from the database
                    # the result will be a list of dictionaries
                    result = cursor.fetchall()
                    return result
                else:
                    # if the query is not an insert or a select, such as an update or delete, commit the changes
                    # return nothing
                    self.connection.commit()
            except Exception as e:
                # in case the query fails
                print("Something went wrong", e)
                return False
            finally:
                # close the connection
                self.connection.close() 
# this connectToMySQL function creates an instance of MySQLConnection, which will be used by server.py
# connectToMySQL receives the database we're using and uses it to create an instance of MySQLConnection
def connectToMySQL(db):
    return MySQLConnection(db)
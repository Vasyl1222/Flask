from flask import Flask, render_template, url_for

app=Flask(__name__)

@app.route('/')
def index():
    return render_template("index.html")

@app.route('/about')
def about():
    return render_template("about.html")

@app.route('/laptops')
def laptops():
    return render_template("laptops.html")

@app.route('/pc')
def pc():
    return render_template("pc.html")

if __name__=="__main__":
    app.run(debug=True)

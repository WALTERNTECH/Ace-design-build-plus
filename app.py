import os
from datetime import date

from dotenv import load_dotenv
from flask import Flask, render_template, request, jsonify
from flask_mail import Mail, Message

load_dotenv()

app = Flask(__name__)

app.secret_key = os.environ.get("SECRET_KEY", "ace_design_build_dev_only")

# =====================================================
# MAIL CONFIG
# =====================================================

COMPANY_EMAIL = os.environ.get("COMPANY_EMAIL", "haningtonekisambo@gmail.com")

app.config["MAIL_SERVER"] = os.environ.get("MAIL_SERVER", "smtp.gmail.com")
app.config["MAIL_PORT"] = int(os.environ.get("MAIL_PORT", 587))
app.config["MAIL_USE_TLS"] = True
app.config["MAIL_USERNAME"] = os.environ.get("MAIL_USERNAME", COMPANY_EMAIL)
app.config["MAIL_PASSWORD"] = os.environ.get("MAIL_PASSWORD")
app.config["MAIL_DEFAULT_SENDER"] = os.environ.get("MAIL_DEFAULT_SENDER", COMPANY_EMAIL)

mail = Mail(app)


# =====================================================
# TEMPLATE GLOBALS
# =====================================================

@app.context_processor
def inject_globals():
    """Values every template can reach without each view passing them."""
    return {"year": date.today().year}

# =====================================================
# PAGES
# =====================================================

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/about")
def about():
    return render_template("about.html")

@app.route("/services")
def services():
    return render_template("services.html")

@app.route("/company")
def company():
    return render_template("company.html")

@app.route("/faq")
def faq():
    return render_template("faq.html")

@app.route("/blog")
def blog():
    return render_template("blog.html")

@app.route("/contact")
def contact():
    return render_template("contact.html")

@app.route("/terms")
def terms():
    return render_template("terms.html")

@app.route("/privacy")
def privacy():
    return render_template("privacy.html")

# =====================================================
# CONTACT FORM
# =====================================================

@app.route("/send-enquiry", methods=["POST"])
def send_enquiry():

    try:

        data = request.form

        first_name = data.get("first_name")
        print("FORM RECEIVED")
        print(data)
        last_name = data.get("last_name")
        email = data.get("email")
        phone = data.get("phone")
        company = data.get("company")
        message = data.get("message")

        admin_email = Message(
            subject=f"New Enquiry From {first_name} {last_name}",
            recipients=[COMPANY_EMAIL]
        )

        admin_email.body = f"""
FIRST NAME: {first_name}
LAST NAME: {last_name}
EMAIL: {email}
PHONE: {phone}
COMPANY: {company}

MESSAGE:
{message}
"""
        print("SENDING ADMIN EMAIL...")
        mail.send(admin_email)

        auto_reply = Message(
            subject="ACE Design + Build Partners",
            recipients=[email]
        )

        auto_reply.body = f"""
Hello {first_name},

Thank you for contacting ACE Design + Build Partners.

We have received your enquiry successfully.

Our team will respond shortly.

Regards,
ACE Design + Build Partners
Nairobi, Kenya
"""
        print("SENDING AUTO REPLY...")
        mail.send(auto_reply)

        return jsonify({
            "success": True
        })

    except Exception as e:

      print("EMAIL ERROR:")
      print(str(e))

      return jsonify({
        "success": False
     }), 500

# =====================================================
# BLOG SUBSCRIBE
# =====================================================

@app.route("/subscribe", methods=["POST"])
def subscribe():

    try:

        data = request.form
        print("SUBSCRIBE FORM RECEIVED")
        print(data)

        email = data.get("email")
        print("EMAIL:", email)

        email = data.get("email")

        welcome = Message(
            subject="Welcome To ACE Newsletter",
            recipients=[email]
        )

        welcome.body = """
Thank you for subscribing to ACE Design + Build Partners.

You will receive:

• Project updates
• Construction insights
• Design inspiration
• Company news

ACE Team
"""

        mail.send(welcome)

        notify = Message(
            subject="New Newsletter Subscriber",
            recipients=[COMPANY_EMAIL]
        )

        notify.body = f"""
New subscriber:

{email}
"""

        mail.send(notify)

        return jsonify({
            "success": True
        })

    except Exception as e:

        print(e)

        return jsonify({
            "success": False
        }), 500

# =====================================================
# RUN APP
# =====================================================



if __name__ == "__main__":
    app.run(
        debug=os.environ.get("FLASK_DEBUG", "1") == "1",
        host="0.0.0.0",
        port=int(os.environ.get("PORT", 5000)),
    )

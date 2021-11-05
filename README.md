## EduCare - An Educational Resource Based Contribution Platform
Submission for IBM Hack 2021

### Overview
The current shift of digitizing education has become very challenging for students who can not afford the requirements necessary for its implementation. From costly resources such as laptops and other gadgets to basic necessities such as a stable internet connection, there is a growing need for a reliable platform to ensure equal access to education in an increasingly digital world. The solution for this problem statement is to implement a resource based contributing platform that can utilized by the required parties to obtain financial support and acquire resources like laptops and other gadgets for students who can’t afford it.

### Setup

1. Clone the repostiory
2. Install dependencies
```
npm install
```
3. Set variables for the keys\connections used in the `.env` file
```
SERVER="
LANGUAGE_TRANSLATOR_VERSION=""
LANGUAGE_TRANSLATOR_APIKEY=""
LANGUAGE_TRANSLATOR_SERVICE_URL=""
WATSON_VERSION=""
WATSON_APIKEY=""
WATSON_URL=""
WATSON_ID=""
MONGODB_CLUSTER_URI=""
```
4. Start the application
```
node run start
```

### Roles and Functionalities

#### Admin

* <i>Validate Organizations </i><br>
Responsible for approving/rejecting the validity of an organization based on the verification application submitted after its registration on the portal. Only approved organizations are visible to a user. 
![Admin-Dashboard](https://github.com/VaishnaviNandakumar/ibm-hack/blob/main/docs/Admin%20Approval.PNG)

#### Organization

* <i>Organization Dashboard</i><br>
Displays the existing requests created by the organization.
![Org-Dashboard](https://github.com/VaishnaviNandakumar/ibm-hack/blob/main/docs/Org-Dashboard.png)

* <i>Create Financial Request</i><br>
Enables the organization to create a financial funding request.

* <i>Create Resource Request</i><br>
Used to create a resource request with specifications based on the type, models and quantity required.

* <i>Verification Application</i><br>
Sumbits an application consisting of the organization representative and contact details for approval by the administrator.

![Org-Verification](https://github.com/VaishnaviNandakumar/ibm-hack/blob/main/docs/Org-Verification.PNG)

* <i>View Applications</i><br>
Displays all the current resource contribution applications from the users.
![View-Applications](https://github.com/VaishnaviNandakumar/ibm-hack/blob/main/docs/Resource-Application.PNG)


#### User

* <i>User Dashboard</i><br>
Displays all the financial and resource requests from approved organizations. A user can view all the details about the resource including the progress of the donation drive. A feature to translate the content is also available.
![User-Dashboard](https://github.com/VaishnaviNandakumar/ibm-hack/blob/main/docs/User-Dashboard.png)

* <i>Contribute Funds </i><br>
Used to extend financial help for a cause. <br>
![Funds](https://github.com/VaishnaviNandakumar/ibm-hack/blob/main/docs/Resource-Contribution.PNG)

* <i>Contribute Resources </i><br>
Enables the user to provide information about a resource they can donate based on an organization's requirments. Information such as model, brand and product images can be submitted to be reviewed by the organization.

* <i>View Application Status</i><br>
Displays the application status for resources that can be contributed by the user.



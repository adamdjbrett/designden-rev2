# Parish STEM Design Den - designden.space
## URGENT Needs
1.  get this working with SQL database. the datbase should be encrypted and using 256 BIT AES
2. get this working with transactional email via mailgun
3. setup demo Quizzes
    1. [Hot Glue Gun](https://forms.gle/r3jiyFeANwmZYviZ8) - Google Link
4. Setup demo Admin Form
    1. See sections J & K.
5. Admin Notificaiton when studen status change
5. restrict account registration eamils to the following domains: @designden.space, @parish.org, and @student.parish.org
6. Remove student ID field
7. Modify student statues to be ❓ in gray, ⚠️, ✅, 🔎

* * *

## A. Intro
build a react web app for a school called "The Parish STEM Design Den"
the homepage should have two buttons create an account and Login

## B. Account Types
There should be three user account types
1. Admin
2. staff
3. student

## C. Admin Dashboard
The admin dashboard have the following elements
1. Import/Export csv
    a. import courses
    b. import students
    c. import courses & students together
2. Create
    a. create class
    b. create student
    c. the ability to add a student to an existing class or a new class
3. View Progress
4. Forms

## D. Staff Dashboard
View everything cannot create

## E. Student Dashbaord
1. See Courses that they are enrolled in
2. See Certificate progress

## F. User profiles
1. Name
2. Email
3. Student ID
4. Avatar
5. Account Type
6. only users on a certain domain are able to create accounts


## G. Courses
Filters
1. Year
2. Terms
    a. trimester 1
    b. trimester 2
    c. trimester 3
3. Course

### H. Course Content
Each course is comprised of a series of forms (quizzes) which the student must take. Each form (quiz) certifies the student to operate the tool. Upon completion of the the form each student should receive a green check mark that is displayed in the student and admin dashboard that they have completed that form/quiz task. 

### I. Course View
1. In the course view admin and staff should be able 
2. to see all students enrolled in the course
3. See all students progress at a glance. 
4. Each form compeleted taht semester earns a green check. Each form uncompleted is a ? and each form that fails is a red X

### J. Student Certification workflow is
1. Online Quiz (at their own pace which is a online form). 
    After finishing Form - set status - ⚠️
2. Then admin gets prompted in dashboad to complete the secondary certification process.
3. Admin form should include the following
    1. prepopulate name, email, date,
    2. ✅ Supervised or 🔎 Unsupervised button
    3. time stamp
    4. and inserts your username and name
    5. Then on the student profile they should have a  ✅ or 🔎 for the tool (F1, F2, F3)
4. After admin form set status ✅ or 🔎

### K. Student statuses are
❓ in gray
⚠️
✅
🔎

### L. Forms/Quiz
1. The ability to design and create forms
2. All standard HTML Form elements needed including file upload
3. Include a signature field where students can sign using mouse/pen/finger their name
4. integrate sample forms.


## M. Key features
1. Students certify themselves
2. admin certify students
3. search
4. transactional emails for password resets and completed forms
    a. automated and easy forgot password reset emails
    b. integrate mailgun.com
5. quickly create student
    - id
    - name
    - email
6. assign students coures
7. asdsign forms
8. all data on the server.
9. transational emails to be sent
    a. new account
    b. forgot password
10. restrict emails to @designden.space, @parish.org, and @student.parish.org
11. SQL encrypted 256-AES salted hash

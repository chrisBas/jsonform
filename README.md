# Pages
This mini js/css library enables someone to create a form or form fields from a simple json object.

## Sample
* <https://chrisbas.github.io/>
* or download this project and open index.html

## Dependencies
* none

## How to use
* Add the following CDN's to your html header:
```html
<script src="https://rawgit.com/chrisBas/jsonform/master/jsonform.js"></script>
<!-- optionally add these styles -->
<link rel="stylesheet" href="https://rawgit.com/chrisBas/jsonform/master/jsonform.css">
```
* If you want to build a new form you can use code like this:

```javascript
form = new JsonForm({
                    "First Name: ": {"type": "text", "placeholder": "my name", "default": "John", "id": "myName", "required": false},
                    "Age: ": {"type": "number", "placeholder": "my age", "default": 21, "id": "myAge", "required": true},
                    "Gender: ": {"type": "select", "placeholder": "my gender", "default": "male", "id": "myGender", "options":["male", "female"], "required": "true"},
                    "Eye Color: ": {"type": "radio", "default": "brown", "id": "eyeColor", "options":["brown", "blue"], "required": "true", "name": "eyecolor"},
                    "Skills: ": {"type": "checkbox", "default": ["math", "science"], "id": "checkbox", "options":["math", "english", "science", "art"], "required": "true", "name": "skills"}
                });
document.body.appendChild(form);
```

* Using the above, you can further extract this into an existing form to keep existing content using the following:

```javascript
let myForm = document.findElementById("myForm");
myForm.innerHTML = form.innerHTML + myForm.innerHTML;
```

* If you only need a partial form field you can use the following:

```javascript
let myForm = document.findElementById("myForm");
myForm.appendChild(new FormField({"type": "text", "placeholder": "my name", "default": "Smith", "id": "myName", "required": false}, "Last Name: "));
```
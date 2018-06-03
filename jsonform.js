class JsonForm {
    constructor(jsonObj) {
        this.form = document.createElement('form');
        for(var key in jsonObj) {
            this.form.appendChild( new FormField(jsonObj[key], key) );
        }
        return this.form;
    }
}


class FormField {
    constructor(jsonObj, name) {
        this.TYPES = ["text", "number", "select", "radio", "checkbox"]

        if( this.isNull(jsonObj, "jsonObj is undefined") || 
                this.isNull(jsonObj.type, "jsonObj.type is undefined") ||
                this.isNull(name, "name is undefined")
            ) { return; }
        if(this.TYPES.indexOf(jsonObj.type) < 0) {
            console.error("valid types are ["+this.TYPES+"] but found type ["+jsonObj.type+"]");
            return;
        }

        switch(jsonObj.type) {
            case "text":
            case "number":
            return this.addElToDiv(this.createInput(jsonObj), name);
            break;
            case "select":
            return this.addElToDiv(this.createSelect(jsonObj), name);
            break;
            case "radio":
            case "checkbox":
            return this.addElToDiv(this.createChoice(jsonObj), name);
            break;
            default:
                console.error("There seems to be a problem with this javascript library.")
                return;
        }
    }

    addElToDiv(element, name) {
        if (element == null) {
            return;
        }
        var div = document.createElement('div');
        div.classList.add("formfield");
        var label = document.createElement('label');
        label.innerText = name;
        if(element.id != undefined && element.id.length > 0)
            label.htmlFor = element.id;
        div.appendChild(label);
        div.appendChild(element);
        return div;
    }

    createInput(json) {
        var input = document.createElement('input');
        input.type = json.type;
        input.required = json.required == true || json.required == "true"
        if(json.placeholder)
            input.placeholder = json.placeholder;
        if(json.default)
            input.value = json.default;
        if(json.id)
            input.id = json.id;

        return input;
    }

    createSelect(json) {
        var selector = document.createElement('select');
        var defaultOption = document.createElement('option');
        defaultOption.disabled = true;
        defaultOption.selected = true;
        if(json.placeholder)
            defaultOption.innerText = json.placeholder;
        selector.appendChild(defaultOption);

        if(json.required == true || json.required == "true"){
            selector.required = true
            if(json.options == null || typeof(json.options) == "string" || json.options.length < 1) {
                console.error("select must contain options")
                return;
            }
        }
        if(json.id)
            selector.id = json.id;
        if(json.options){
            for(var i in json.options) {
                var optEl = document.createElement('option');
                optEl.value = json.options[i];
                optEl.innerText = json.options[i];
                if(json.default == json.options[i])
                    optEl.selected = true;
                selector.appendChild(optEl);
            }
        }
        return selector;
    }

    createChoice(json) {
        if(this.isNull(json.options, "options must not be null.") || this.isNull(json.name, "name property must not be null.")) {
            return;
        }
        if(typeof(json.options) == "string" || json.options.length < 1) {
            console.error("options must be a non-empty array");
            return;
        }
        let outSpan = document.createElement('span');
        outSpan.classList.add('container');
        if(json.id)
            outSpan.id = json.id;
        for(var i in json.options){
            let opt = json.options[i];
            let span = document.createElement('span');
            let label = document.createElement('label');
            label.innerText = opt;
            label.htmlFor = json.name + "-" + opt;
            let btn = document.createElement('input');
            btn.type = json.type;
            btn.id = label.htmlFor;
            btn.name = json.name;
            if(json.required == true || json.required == "true")
                btn.required = true;
            if(json.default == opt)
                btn.checked = true;
            else if(json.default != null && typeof(json.default) == "object"){
                // for multi-select
                if(json.default.indexOf(opt) >= 0)
                    btn.checked = true;
            }
            span.appendChild(btn);
            span.appendChild(label);
            outSpan.appendChild(span);
        }
        return outSpan;
    }

    isNull(val, err="") {
        if(err.length > 0 && val == undefined) {
            console.error(err);
            return true;
        } else if(val == undefined) {
            return true;
        }
        return false;
    }
}
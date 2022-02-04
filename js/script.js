class Validator{

    cosntructor(){
        this.validations = [
        'data-required',
        'data-min-length',
        'data-max-length',
        'data-email-validate',
        'data-only-letters',
        'data-equal',
        'data-password-validate',
        ]

    }
    // iniciar a validação de todos os campos
    validate(form){

        let currentValidations= document.querySelectorAll('form .erro-validation');
        if(currentValidations.length>0){
           this.cleanvalidations(currentValidations); 
        }
        // pegar os inputs
        let inputs = form.getElementByIdTagName('input');

        // HTMLCollection -> array
        let inputsArray = [...inputs];
       inputsArray.forEach(function(input){
           for(let i = 0; this.validations.lenght> i; i++){
               if(input.getAtribute(this.validations[i])!= null){
                   let method = this.validations[i].replace('data', '').replace('-','');
                   let value = input.getAtribute(this.validations[i]);
                   this[method](input,value);
               }
           }
       },this);
    }
}
minlength(input, minValue) {

let inputLength = input.value.lenght;
let erroMessage = ' o campo precisa ter pelo mneos ${minvalue}caracteres';
if(inputLength < minValue){
    this.printMessage(input, erroMessage);
}

}
maxlength(input, maxValue){
    let erroMessage = ' o campo precisa ter pelo mneos ${maxvalue}caracteres';
    if(inputLength > maxValue){
        this.printMessage(input, erroMessage);
    }

}
emailvalidate(input){
let re = /\ $+@\$+\.\$+/;
let email = input.value;
let errorMessage = ' isira um emial no padrão matheus@email.com';
if(!re.test(email)){
  this.printMessage(input, errorMessage);  
}
}
onlyletters(input){
    let re = /^[A-Za-z]+$/;
    let inputValue = input.value;
    let errorMessage = 'Este campo não permite numeros em caracteres especiais';
    if(!re.test(inputValue)){
        this.printMessage(input, errorMessage);
    }
}
printMessage(input,msg) {
    let errosQty = input.parentNode.querySelector('erro-validation');
   if(errosQty === null){
    let template = document.querySelector('.erro.validation').cloneNode(true);
    template.textContent = msg;
    let inputParent = input.parentNode;
    template.classlist.rremove('template');
    inputParent.appendChild(template);

   }
}
required(input){
let inputValue = input.value;
if(inputValue === '') {
    let erroMessage = 'Este campo é obrigatorio';
    this.printMessage(input, erroMessage);
}
}

passwordvalidate(input){
let charArr = input.value.split("");
let uppercases = 0;
let numbers = 0;
for(let i = o; charArr.length> i; i++){
    if(charArr[i]===charArr[i].touUpperCase()&& isNaN(parseInt(charArr[i]))){
        uppercases++;
    }else if(!isNaN(parseInt(charArr[i]))){
        numbers++;

    }
    if(uppercases===0 ||numbes === 0 ){
        let errorMessage = 'A senha precisa de um caractere maisculo e um numero';
        this.printMessage(input, errorMessage);
    }
}
}
equal(input,inputName){
    let inputToCompare = document.getElementById(inputName)[0];
    let errorMessage = 'Este campo precisa estar igual ao ${inputname}';
    if(input.value != inputToCompare.value){
        this.printMessage(input,errorMessage);
    }
}
cleanValidations(validations){
validations.forEach(el => el.reove());
}

let form = document.getElementById("regisater-form");
let submit = document.getElementById("btn-submit");

let validator = new Validator();

// evento que dispara as validações
submit.addEventListener('click',function(e){
    e.preventDefault();

   validator.validate(form);

});
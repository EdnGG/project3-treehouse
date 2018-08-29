$(document).ready( ()=> {

    // Focus on the first TextField
    $("#name").focus();
    
    //Job Role Section of the form. Hidding the Div Input type element 
    $("#other-title").hide();
    $("#title").change(() => {
        if ($("#title").val() === "other") {
            $("#other-title").show('slow').focus();
        } else {
            $("#other-title").hide('slow');
        }
    });

    // T-shirt Section
    $('#colors-js-puns').hide();  

    $("#design").change(() => {
        $('#colors-js-puns').show();

        if ($("#design").val() === "heart js") {
            $(".puns").hide();
            $(".heart").show();
            color.value = $(".heart")[0].value;

        } else if ($("#design").val() === "js puns") {
            $(".puns").show('slow');
            $(".heart").hide();
            color.value = $(".puns")[0].value;
        } else {
            $(".puns").show();
            $(".heart").show();
        }
    });  

    //Checkbox Section 1
    $(".mix1").click(() => {
        if ($("#js-frame").prop("checked")) {
            $("#express").attr("disabled", "true");

        } else if ($("#express").prop("checked")) {
            $("#js-frame").attr("disabled", "true");

        } else {
            $("#express").removeAttr("disabled");
            $("#js-frame").removeAttr("disabled");
        }
    });
    $(".mix2").click(() => {

        if ($("#j-libs").prop("checked")) {
            $("#nod").attr("disabled", "true");

        } else if ($("#nod").prop("checked")) {
            $("#j-libs").attr("disabled", "true");

        } else {
            $("#j-libs").removeAttr("disabled");
            $("#nod").removeAttr("disabled");
        }
    });

    // Checkbox Section 2

    $('#activities').hide();
    const cost = () => {
        let total = 0;
        for (let i = 0; i < $('.total').length; i++) {
            if ($('.total')[i].checked) {
                $('#activities').show('slow');
                total += parseInt($('.total')[i].value);
            } else if ($('.total')[i].checked === false) {
                $("#activities").hide();
            }
        }
        $('#activities').val(`$  ${total}`); 
    }
    $('#check').click(() => cost());

    $('.bitcoin').hide();
    $('.paypal').hide();
    $('.credit-card').hide();
    $('#payment').change( function() {
        if (this.value === 'select_method') {
            $('.credit-card').hide();
            $('.paypal').hide();
            $('.bitcoin').hide();

        } else if (this.value === 'bitcoin') {
            $('.bitcoin').show();
            $('.paypal').hide();
            $('.credit-card').hide();

        } else if (this.value === 'credit-card') {
            $('.credit-card').show();
            $('#cc-num').focus();
            $('.paypal').hide();
            $('.bitcoin').hide();

        } else if (this.value === 'paypal') {
            $('.paypal').show();
            $('.bitcoin').hide();
            $('.credit-card').hide();
        }
    });

    // Hiding the Error Messages Elements from the DOM      
    $("#name-error").hide();
    $("#mail-error").hide();
    $("#activities-error").hide();
    $("#ccnum-error").hide();
    $("#zip-error").hide();
    $("#cvv-error").hide();
    $("#method").hide();

    //Validating Section  
    const valName = ()=> {
        const nameRegex = /^[A-Za-z\s]{3,20}$/i;
        let name = $("#name").val();
        if (!nameRegex.test(name)) {
            
            console.log(' name invalid');
            $("#name-error").show();
            $(".e").css('color', 'red');
            $("#name").focus();
            
            return false;
        }
            console.log(' valid name');        
            $("#name-error").hide();
            return true;
        }
    
    const valMail = ()=> {
        const Mailregex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        let mail = $("#mail").val();
        if (mail === '' || !Mailregex.test(mail)) {
           
            console.log(' wrong email');
            $("#mail-error").show();
            $(".e").css('color', 'red');
            $("#mail").focus();
            return false;
        } else {
            console.log(' valid email');
            $("#mail-error").hide();
            return true;
        }
    }
    const valCheckbox = () => {
       let checkedbox = $('input:checked').length; // Indica que algun checkbox a sido seleccionado
        if (!checkedbox) { // negacion de que ningun checkbox fue checado
            
            $('#activities-error').show();
            console.log("activities has  not been checked");
            return false;
        } else {
            $('#activities-error').hide();
            console.log("activities has been checked");
            return true;
        }
    }
    const cCard = () => {
        const ccNum = document.getElementById('cc-num').value; 
      //  
      if (ccNum.length < 13 || ccNum.length > 16 || isNaN(ccNum) || ccNum === "") {
            
            console.log(' invalid credit card');
            $("#ccnum-error").show();
            $(".e").css('color', 'red');
            $("#cc-num").focus();
            
            return false;
        } 
            console.log(' valid credit card');
            $("#ccnum-error").hide();
            return true;
    }
    const zipC = () => {
        const zip = document.getElementById('zip').value;
        if (zip.length !== 5 || isNaN(zip) || zip === "") {
          
            console.log('invalid zip');
            
            $("#zip-error").show();
            $(".e").css('color', 'red');
            $("#zip").focus();
            
            return false;
        }
            console.log(' valid zip');
            $("#zip-error").hide();
            return true;
    }
    const cvvC = () => {
        const cvv = document.getElementById('cvv').value;
        if (cvv.length !== 3 || isNaN(cvv) || cvv === "") {
          
            console.log(' invalid cvv');
            $(".e").css('color', 'red');
            $("#cvv-error").show();
            $("#cvv").focus();
            return false;
        }
            console.log(' valid cvv');
            $("#cvv-error").hide();
            return true;
    } 

    // validation 
    const val = () => {

        let payment = $('#payment').val()

            if (valName() && valMail() && valCheckbox() && payment === 'select_method' ) {
                $("#method").show();
                   return false;
            } if (!payment === 'select_method'){
                $("#method").hide();
            } else if (payment === 'paypal' || payment === 'bitcoin' || payment === 'select_method') {
                    $("#method").hide();
                    if ( valName() && valMail() && valCheckbox()) {
                            $("#method").hide();
                            alert("The form has been filled successfully");
                                return true;
                        }
                } else if (payment === 'credit-card') {
                    $("#method").hide();
                    if (valName() && valMail() && valCheckbox() && cCard() && zipC() && cvvC()) {
                            alert("The form has been filled successfully");
                                return true;
                        }
                }
    }  
        
    // Click event for submmit the form validation
    $('#btn').click( function (e) {
        if ( val() === true ){
            return true;
        }
        e.preventDefault();  
    });
})
    
var stripeKey = 'pk_test_EdJlSPmqO0xEFAdt8HkGrdKb00l3XuP2ov';
var stripe = Stripe(stripeKey);
var elements = stripe.elements();
var card = elements.create('card', {
    style: {
        base: {
            color: '#C0C0C0',
            fontSize: '14px',
            iconColor: 'gray',
        },
    },
    hidePostalCode: true,
});

card.mount('#card-element');

card.on('focus', () => {
    console.log('user is in form');
});

card.addEventListener('change', function (event) {
    var errors = document.getElementById('errors');

    if (event.error) {
        errors.textContent = event.error.message;
    } else {
        errors.textContent = '';
    }
});

var form = document.querySelector('#card-form');

form.addEventListener('submit', (event) => {
    event.preventDefault();

    stripe
        .createToken(card)
        .then((result) => {
            if (result.error) {
                // Alertar al usuario que hubo un error
            } else {
                console.log(result.token.id);
                alert('Pago realizado con exito');
            }
        });
});
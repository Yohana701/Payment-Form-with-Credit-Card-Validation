document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('paymentForm');
    const cardNumberInput = document.getElementById('cardNumber');
    const cardAcceptedMessage = document.getElementById('cardAcceptedMessage');

    form.addEventListener('submit', function(event) {
        // Prevent form submission
        event.preventDefault();

        // Get input values
        const cardNumber = cardNumberInput.value;
        const expiryDate = document.getElementById('expiryDate').value;
        const cvv = document.getElementById('cvv').value;

        // Clear previous errors and messages
        clearErrors();
        cardAcceptedMessage.textContent = '';

        let isValid = true;

        // Validate credit card number
        if (!validateCardNumber(cardNumber)) {
            showError('cardNumberError', 'Invalid credit card number.');
            isValid = false;
        } else {
            cardAcceptedMessage.textContent = 'Card Accepted!';
            // Clear the message after 10 seconds
            setTimeout(() => {
                cardAcceptedMessage.textContent = '';
            }, 10000);
        }

        // Validate expiration date
        if (!validateExpiryDate(expiryDate)) {
            showError('expiryDateError', 'Invalid expiration date. Use MM/YY.');
            isValid = false;
        }

        // Validate CVV
        if (!validateCVV(cvv)) {
            showError('cvvError', 'Invalid CVV.');
            isValid = false;
        }

        if (isValid) {
            // Submit the form if all validations pass
            form.submit();
        }
    });

    function validateCardNumber(number) {
        // Check if the card number is in the correct format (basic example)
        const cardNumberPattern = /^\d{4}\s\d{4}\s\d{4}\s\d{4}$/;
        return cardNumberPattern.test(number);
    }

    function validateExpiryDate(date) {
        // Check if the expiry date is in MM/YY format
        const expiryDatePattern = /^(0[1-9]|1[0-2])\/\d{2}$/;
        return expiryDatePattern.test(date);
    }

    function validateCVV(cvv) {
        // Check if the CVV is a 3-digit number
        const cvvPattern = /^\d{3}$/;
        return cvvPattern.test(cvv);
    }

    function showError(id, message) {
        document.getElementById(id).textContent = message;
    }

    function clearErrors() {
        const errors = document.querySelectorAll('.error');
        errors.forEach(error => error.textContent = '');
    }
});

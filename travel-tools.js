// Travel Tools JavaScript - Baggage Calculator and Currency Converter
document.addEventListener('DOMContentLoaded', () => {
    // Baggage Allowance Calculator
    const baggageForm = document.getElementById('baggageForm');
    const baggageResult = document.getElementById('baggageResult');
    const cabinAllowance = document.getElementById('cabinAllowance');
    const checkedAllowance = document.getElementById('checkedAllowance');
    const baggageFee = document.getElementById('baggageFee');
    
    if (baggageForm) {
        baggageForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const fareType = document.getElementById('fareType').value;
            const cabinBags = parseInt(document.getElementById('cabinBags').value);
            const checkedBags = parseInt(document.getElementById('checkedBags').value);
            
            // Calculate allowances based on fare type
            let allowedCabinBags = 1;
            let allowedCheckedBags = 0;
            let additionalFee = 0;
            
            switch(fareType) {
                case 'standard':
                    allowedCabinBags = 1;
                    // Extra cabin bags cost ₹1500 each
                    if (cabinBags > allowedCabinBags) {
                        additionalFee += (cabinBags - allowedCabinBags) * 1500;
                    }
                    // All checked bags cost ₹2000 each
                    additionalFee += checkedBags * 2000;
                    break;
                    
                case 'plus':
                    allowedCabinBags = 2;
                    allowedCheckedBags = 1;
                    // Extra cabin bags cost ₹1200 each
                    if (cabinBags > allowedCabinBags) {
                        additionalFee += (cabinBags - allowedCabinBags) * 1200;
                    }
                    // Extra checked bags cost ₹1800 each
                    if (checkedBags > allowedCheckedBags) {
                        additionalFee += (checkedBags - allowedCheckedBags) * 1800;
                    }
                    break;
                    
                case 'premium':
                    allowedCabinBags = 2;
                    allowedCheckedBags = 2;
                    // Extra cabin bags not allowed in premium
                    if (cabinBags > allowedCabinBags) {
                        additionalFee += (cabinBags - allowedCabinBags) * 1000;
                    }
                    // Extra checked bags cost ₹1500 each
                    if (checkedBags > allowedCheckedBags) {
                        additionalFee += (checkedBags - allowedCheckedBags) * 1500;
                    }
                    break;
            }
            
            // Update result
            cabinAllowance.textContent = allowedCabinBags === 1 ? '1 x 10kg bag' : '2 x 10kg bags';
            checkedAllowance.textContent = allowedCheckedBags === 0 ? 'None' : 
                                          allowedCheckedBags === 1 ? '1 x 20kg bag' : 
                                          '2 x 20kg bags';
            baggageFee.textContent = `₹${additionalFee}`;
            
            // Show result with animation
            baggageResult.classList.remove('hidden');
            baggageResult.classList.add('animate-fade-in');
            
            // Add pulse animation to fees if there are any
            if (additionalFee > 0) {
                baggageFee.classList.add('text-red-600');
                baggageFee.classList.add('pulse-animation');
            } else {
                baggageFee.classList.remove('text-red-600');
                baggageFee.classList.remove('pulse-animation');
                baggageFee.classList.add('text-green-600');
            }
        });
    }
    
    // Currency Converter
    const currencyForm = document.getElementById('currencyForm');
    const swapCurrencyBtn = document.getElementById('swapCurrency');
    
    // Exchange rates (static for demo)
    const exchangeRates = {
        INR: {
            EUR: 0.011,
            USD: 0.012,
            GBP: 0.0095,
            INR: 1
        },
        EUR: {
            INR: 90.5,
            USD: 1.09,
            GBP: 0.86,
            EUR: 1
        },
        USD: {
            INR: 83.0,
            EUR: 0.92,
            GBP: 0.79,
            USD: 1
        },
        GBP: {
            INR: 105.0,
            EUR: 1.16,
            USD: 1.27,
            GBP: 1
        }
    };
    
    // Currency symbols
    const currencySymbols = {
        INR: '₹',
        EUR: '€',
        USD: '$',
        GBP: '£'
    };
    
    if (currencyForm) {
        currencyForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const amount = parseFloat(document.getElementById('amount').value);
            const fromCurrency = document.getElementById('fromCurrency').value;
            const toCurrency = document.getElementById('toCurrency').value;
            const resultField = document.getElementById('result');
            
            if (isNaN(amount)) {
                resultField.value = 'Please enter a valid amount';
                return;
            }
            
            // Get exchange rate
            const rate = exchangeRates[fromCurrency][toCurrency];
            
            // Calculate converted amount
            const convertedAmount = amount * rate;
            
            // Display result with animation
            resultField.value = `${currencySymbols[toCurrency]}${convertedAmount.toFixed(2)}`;
            
            // Add a quick flash animation
            resultField.classList.add('bg-yellow-100', 'dark:bg-yellow-900');
            setTimeout(() => {
                resultField.classList.remove('bg-yellow-100', 'dark:bg-yellow-900');
            }, 300);
        });
        
        // Swap currencies
        if (swapCurrencyBtn) {
            swapCurrencyBtn.addEventListener('click', () => {
                const fromCurrency = document.getElementById('fromCurrency');
                const toCurrency = document.getElementById('toCurrency');
                
                // Swap values
                const temp = fromCurrency.value;
                fromCurrency.value = toCurrency.value;
                toCurrency.value = temp;
                
                // Add rotation animation to swap button
                swapCurrencyBtn.classList.add('animate-spin');
                setTimeout(() => {
                    swapCurrencyBtn.classList.remove('animate-spin');
                }, 500);
                
                // Recalculate if there's a value
                if (document.getElementById('result').value !== '') {
                    currencyForm.dispatchEvent(new Event('submit'));
                }
            });
        }
    }
    
    // Apply animations to travel tool cards
    const travelToolCards = document.querySelectorAll('.travel-tool-card');
    travelToolCards.forEach(card => {
        card.classList.add('hover-scale');
        
        // Animate icons inside cards
        const icon = card.querySelector('i');
        if (icon && icon.classList.contains('fa-exchange-alt')) {
            icon.classList.add('rotate-hover');
        }
        if (icon && icon.classList.contains('fa-suitcase')) {
            icon.classList.add('float-animation');
        }
    });
}); 
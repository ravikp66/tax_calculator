function formatIndianNumbering(num) {
    // Convert to string and remove any non-numeric except decimal
    num = num.toString().replace(/[^0-9.]/g, "");

    // Split integer and decimal parts
    let [integerPart, decimalPart] = num.split(".");

    // Format the integer part correctly
    integerPart = formatIndianInteger(integerPart);

    // Return formatted number with decimal part (if exists)
    return decimalPart ? integerPart + "." + decimalPart : integerPart;
}

function formatIndianInteger(num) {
    if (!num) return ""; // Handle empty input

    let n = num.length;
    
    if (n <= 3) return num; // No need for formatting if ≤ 999

    let lastThree = num.slice(-3); // Last three digits
    let rest = num.slice(0, -3);   // Remaining part before last three digits

    // Add commas every two digits in the remaining part
    rest = rest.replace(/\B(?=(\d{2})+(?!\d))/g, ",");

    return rest ? rest + "," + lastThree : lastThree;
}

 function indianNumberToFloat(numStr) {
            return parseFloat(numStr.replace(/,/g, "")) || 0;
        }


function calculateTax() {
	    
    const income = indianNumberToFloat(document.getElementById('income').value);
    const standardDeductionOld = indianNumberToFloat(document.getElementById('standardDeductionOld').value) || 0;
    const hra = indianNumberToFloat(document.getElementById('hra').value) || 0;
    const lta = indianNumberToFloat(document.getElementById('lta').value) || 0;
    const section80C = indianNumberToFloat(document.getElementById('section80C').value) || 0;
    const section80CCD1B = indianNumberToFloat(document.getElementById('section80CCD1B').value) || 0;
    const section80D = indianNumberToFloat(document.getElementById('section80D').value) || 0;
    const section80E = indianNumberToFloat(document.getElementById('section80E').value) || 0;
    const section80TTA = indianNumberToFloat(document.getElementById('section80TTA').value) || 0;
    const section80DDB = indianNumberToFloat(document.getElementById('section80DDB').value) || 0;
    const section80DD = indianNumberToFloat(document.getElementById('section80DD').value) || 0;
    const standardDeductionNew = indianNumberToFloat(document.getElementById('standardDeductionNew').value) || 0;
    const npsContribution = indianNumberToFloat(document.getElementById('npsContribution').value) || 0;
    const transportAllowance = indianNumberToFloat(document.getElementById('transportAllowance').value) || 0;
    const conveyanceAllowance = indianNumberToFloat(document.getElementById('conveyanceAllowance').value) || 0;
    const dailyAllowance = indianNumberToFloat(document.getElementById('dailyAllowance').value) || 0;
    const epfPpfInterest = indianNumberToFloat(document.getElementById('epfPpfInterest').value) || 0;

    if (isNaN(income) || income <= 0) {
        alert('Please enter a valid income.');
        return;
    }

    const oldTaxableIncome = income - standardDeductionOld - hra - lta - section80C - section80CCD1B - section80D - section80E - section80TTA - section80DDB - section80DD;
    const newTaxableIncome = income - standardDeductionNew - npsContribution - transportAllowance - conveyanceAllowance - dailyAllowance - epfPpfInterest;

    const oldTax = calculateOldTax(oldTaxableIncome);
    const newTax = calculateNewTax(newTaxableIncome);

    document.getElementById('resultOld').innerHTML = `
        <p>Taxable Income (Old Tax Regime): ₹${formatIndianNumbering(oldTaxableIncome)}</p>
        <p>Old Tax Regime: ₹${formatIndianNumbering(oldTax)}</p>
    `;
    document.getElementById('resultNew').innerHTML = `
        <p>Taxable Income (New Tax Regime): ₹${formatIndianNumbering(newTaxableIncome)}</p>
        <p>New Tax Regime: ₹${formatIndianNumbering(newTax)}</p>
    `;
}

function calculateOldTax(income) {
    // Example tax slabs for old regime
    if (income <= 250000) return 0;
    if (income <= 500000) return (income - 250000) * 0.05;
    if (income <= 1000000) return 12500 + (income - 500000) * 0.2;
    return 112500 + (income - 1000000) * 0.3;
}

function calculateNewTax(income) {
    // Updated tax slabs for new regime FY 2025-26
    if (income <= 400000) return 0;
    if (income <= 800000) return (income - 400000) * 0.05;
    if (income <= 1200000) return 20000 + (income - 800000) * 0.1;
    if (income <= 1600000) return 60000 + (income - 1200000) * 0.15;
    if (income <= 2000000) return 120000 + (income - 1600000) * 0.2;
    if (income <= 2400000) return 200000 + (income - 2000000) * 0.25;
    return 300000 + (income - 2400000) * 0.3;
}


     
document.addEventListener("DOMContentLoaded", init);

function init() {
    const totalAmountElement = document.getElementById('amount');
    const modal = document.getElementById('my_modal_1');
    const historyContainer = document.querySelector('.history-cards');

    document.getElementById('btn-donation').addEventListener('click', () => toggleVisibility('.donation-body', '.history-body'));
    document.getElementById('btn-history').addEventListener('click', () => toggleVisibility('.history-body', '.donation-body'));

    document.querySelectorAll('.btn-donate').forEach(donateButton => {
        donateButton.addEventListener('click', () => processDonation(totalAmountElement, modal, historyContainer));
    });

    modal.querySelector('.btn').addEventListener('click', () => modal.close());
}

function toggleVisibility(showSelector, hideSelector) {
    document.querySelector(showSelector).classList.add('body-active');
    document.querySelector(hideSelector).classList.remove('body-active');
}

function processDonation(totalAmountElement, modal, historyContainer) {
    const card = event.target.closest('.donation-card');
    const inputField = card.querySelector('input[type="text"]');
    const presentAmountElement = card.querySelector('.donated-amount p');

    const donationValue = inputField.value.trim();
    const donationAmount = parseInt(donationValue);
    const currentTotal = parseInt(totalAmountElement.textContent);

    if (!Number.isInteger(donationAmount) || donationAmount <= 0) {
        alert("Please enter a valid donation amount (positive integers only).");
        return;
    }

    if (donationAmount > currentTotal) {
        alert("You cannot donate more than the available amount.");
        return;
    }

    totalAmountElement.textContent = `${currentTotal - donationAmount} BDT`;

    const currentCardAmount = parseInt(presentAmountElement.textContent);
    presentAmountElement.textContent = `${currentCardAmount + donationAmount} BDT`;

    inputField.value = '';

    const historyCard = document.createElement('div');
    historyCard.className = 'history-card';
    const historyTitle = document.createElement('h3');
    historyTitle.textContent = `${donationAmount} BDT is Donated for "${card.querySelector('.donation-title').textContent}"`;
    const historyDate = document.createElement('p');
    historyDate.textContent = `Date : ${new Date().toString()}`;

    historyCard.appendChild(historyTitle);
    historyCard.appendChild(historyDate);
    historyContainer.appendChild(historyCard);

    modal.showModal();
}

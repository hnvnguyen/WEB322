window.onload = function () {
    document.getElementById('account_toggle').addEventListener('click', function() {
        document.querySelector('#account_sec').style.display = 'flex';
    })
    document.getElementById('account_close').addEventListener('click', function() {
        document.querySelector('#account_sec').style.display = 'none';
    })
};
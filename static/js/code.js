function calculate() {
    var spot = document.getElementsByName('spot')[0].value;
    var price = document.getElementsByName('price')[0].value;
    var oz = document.getElementsByName('oz')[0].value;
    if (spot === '') {
        alert('Please specify a spot price');
        return false;
    }
    if (price === '') {
        alert('Please specify an item price');
        return false;
    }
    if (oz === '') {
        alert('Please specify an item weight');
        return false;
    }
    var request = new XMLHttpRequest();
    request.open('POST', '/api/over', false);
    request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
    request.send('spot='+spot+'&price='+price+'&oz='+oz);
    var data = JSON.parse(request.responseText);
    var over = data['result'];

    request = new XMLHttpRequest();
    request.open('POST', '/api/premium', false);
    request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
    request.send('spot='+spot+'&price='+price+'&oz='+oz);
    data = JSON.parse(request.responseText);
    var premium = data['result'];

    var div = document.getElementsByClassName('results')[0];
    div.innerHTML = '';

    var sp1 = document.createElement('span');
    sp1.innerHTML = '<span style="color:red">Premium: </span>$'+premium+'<br>';
    div.appendChild(sp1);
    var sp2 = document.createElement('span');
    sp2.innerHTML = '<span style="color:red">Price over spot: </span>$'+over;
    div.appendChild(sp2);
    return false;
}

function convert() {
    var amount = document.getElementsByName('amount')[0].value;
    if (amount === '') {
        alert('Please specify an amount');
        return false;
    }
    var grams = document.getElementsByName('grams')[0];
    var oz = document.getElementsByName('ounces')[0];
    if (oz.checked && grams.checked) {
        alert('Please only select Grams or Ounces');
        return false;
    }
    var res;
    if (oz.checked) {
        var request = new XMLHttpRequest();
        request.open('POST', '/api/to_grams', false);
        request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
        request.send('oz='+amount);
        var data = JSON.parse(request.responseText);
        res = data['grams'] + ' grams';
    }
    else if (grams.checked) {
        var request = new XMLHttpRequest();
        request.open('POST', '/api/to_ounces', false);
        request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
        request.send('grams='+amount);
        var data = JSON.parse(request.responseText);
        res = data['oz'] + ' oz';
    }
    var div = document.getElementsByClassName('conversion')[0];
    div.innerHTML = '';
    var sp = document.createElement('span');
    sp.innerHTML = '<span style="color:red">Converted: </span>'+res;
    div.appendChild(sp);
    return false;
}

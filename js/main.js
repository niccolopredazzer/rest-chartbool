$(document).ready(function () {

    $.ajax({
        url: 'http://157.230.17.132:4028/sales',
        method: 'GET',
        success: function (data) {

                var oggettoMesi = {
                    'gennaio': 0,
                    'febbraio': 0,
                    'marzo': 0,
                    'aprile': 0,
                    'maggio': 0,
                    'giugno': 0,
                    'luglio': 0,
                    'agosto': 0,
                    'settembre': 0,
                    'ottobre': 0,
                    'novembre': 0,
                    'dicembre': 0
                };

                for (var i = 0; i < data.length; i++) {
                    var risultato = data[i];
                    var venditeData = risultato.date;
                    var dataMese = moment(venditeData, "DD-MM-YYYY").format('MMMM');
                    if (oggettoMesi[dataMese] === undefined) {
                        oggettoMesi[dataMese] = 0;
                    }
                    oggettoMesi[dataMese] += risultato.amount;
                }
                var labelsMese = [];
                var valoriMese = [];
                for (var key in oggettoMesi) {
                        labelsMese.push(key);
                        valoriMese.push(oggettoMesi[key]);
                }
                creaGraficoLinea(labelsMese, valoriMese);


                //grafico-pie//

                var venditeCiascuno = {};
                for (var i = 0; i < data.length; i++) {
                    var salesmanSpecifico = data[i].salesman;
                    if (venditeCiascuno[salesmanSpecifico] === undefined) {
                        venditeCiascuno[salesmanSpecifico] = 0;
                        
                    }
                    venditeCiascuno[salesmanSpecifico] += data[i].amount;
                }

                var arrayVenditori = [];
                var arrayVendite = [];
                for (var key in venditeCiascuno) {
                    arrayVenditori.push(key);
                    arrayVendite.push(venditeCiascuno[key]);
                }

                creaGraficoPie (arrayVenditori, arrayVendite);
            },
            error: function () {
                alert('errore');
            }
        });



    //funzioni//



    //funzione grafico a linea//
    function creaGraficoLinea (labelsMese, valoriMese) {
        var ctx = $('#grafico');
        var chart = new Chart(ctx, {
            type: 'line',
            data: {
                    labels: labelsMese,
                    datasets: [{
                    label: 'Vendite al mese',
                    backgroundColor: 'rgb(164 143 122)',
                    borderColor: 'black',
                    lineTension: 0,
                    data: valoriMese
                    }]
                }
            });
    }
    //funzione grafico a torta//
    function creaGraficoPie (labelsVenditori, venditePerSalesman){
        var ctx = $('#grafico-due');
        var myPieChart = new Chart(ctx, {
            type: 'pie',
            data: {
                    labels: labelsVenditori,
                    datasets: [{
                    label: 'Vendite Mensili',
                    data: venditePerSalesman,
                    backgroundColor: ['lightcoral', 'lightblue', 'lightgreen', 'lightyellow']
                    }]
                }
        });
    }



});

$(document).ready(function () {

    var itemTmplCobertura = 0;
    var areaCobertura = $('.area-cobertura');
    var tmplCobertura = $('.tmpl-cobertura');

    var itemTmplBeneficiario = 0;
    var areaBeneficiario = $('.area-beneficiario');
    var tmplBeneficiario = $('.tmpl-beneficiario');

    $('#btnAddCobertura').click(function () {

        var tmplCoberturaAdd = tmplCobertura.clone();

        var sequenciaItem = `item-${itemTmplCobertura}`;
        tmplCoberturaAdd.addClass(sequenciaItem);
        areaCobertura.append(tmplCoberturaAdd);
        itemTmplCobertura++;

    });

    $(document).on('click', '.btnExlcuirCobertura', function () {

        if (itemTmplCobertura == 0) {
            return;
        }

        itemTmplCobertura--;
        $(`.item-${itemTmplCobertura}`).remove();
    });


    $('#flexSwitchCheckDefault').on("change", function () {

        var valueCheck = $('#flexSwitchCheckDefault').is(":checked");
        var valueDisplay = $('.wrapperBene').css('display');

        if (valueCheck && valueDisplay == 'none') {
            $('.wrapperBene').css('display', 'block');
        } else {
            $('.wrapperBene').css('display', 'none');
        }

    });

    $("#btnAddBeneficiario").click(function () {

        var valueCheck = $('#flexSwitchCheckDefault').is(":checked");

        if (!valueCheck) {
            alert('Selecione a opção de adicionar um beneficiário!');
            return;
        }
        var tmplBeneficiarioAdd = tmplBeneficiario.clone();

        var sequenciaItem = `item-${itemTmplBeneficiario}`;
        tmplBeneficiarioAdd.addClass(sequenciaItem);
        areaBeneficiario.append(tmplBeneficiarioAdd);
        itemTmplBeneficiario++;

    });

    $(document).on('click', '.btnExlcuirBene', function () {

        if (itemTmplBeneficiario == 0) {
            return;
        }

        itemTmplBeneficiario--;
        $(`.item-${itemTmplBeneficiario}`).remove();
    });


    $('#btnAddExcluirItem').click(function () {
        Delete();
    });


    $('.txtInputSeguradora').blur(function () {
        SaveProgress();
    });

    $('.txtNumeroApolice').blur(function () {
        SaveProgress();
    });

    $(document).on('blur', '.txtCobertura', function () {
        SaveProgress();
    });

    $(document).on('blur', '.txtCapitalSegurado', function () {
        SaveProgress();
    });

    $(document).on('blur', '.txtBeneficiario', function () {
        SaveProgress();
    });

    $(document).on('blur', '.txtPercentualBeneficiario', function () {
        SaveProgress();
    });

    $(document).on('blur', '.btnExlcuirBene', function () {
        SaveProgress();
    });

    $(document).on('blur', '#DataAquisicaoApolice', function () {
        SaveProgress();
    });

    $(document).on('blur', '#ValorPremio', function () {
        SaveProgress();
    });

    $(document).on('blur', '#Frequencia', function () {
        SaveProgress();
    });

    $(document).on('blur', '#Porque', function () {
        SaveProgress();
    });

    function SaveProgress() {

        var seguro = {};

        seguro.Seguradora = $('.txtInputSeguradora').val();
        seguro.NumeroApolice = $('.txtNumeroApolice').val();

        var coberturas = []

        $('.tmpl-cobertura').each(function () {

            var textCobertura = $(this).find('.txtCobertura').val();
            var textCapitalSegurado = $(this).find('.txtCapitalSegurado').val();

            var cobertura = {};
            cobertura.Nome = textCobertura
            cobertura.ValorCapitalSegurado = textCapitalSegurado;

            coberturas.push(cobertura);

        });

        seguro.Coberturas = coberturas;

        var beneficiarios = []

        $('.tmpl-beneficiario').each(function () {

            var textBeneficiario = $(this).find('.txtBeneficiario').val();
            var textPercentualBeneficiario = $(this).find('.txtPercentualBeneficiario').val();

            var beneficiario = {};
            beneficiario.Nome = textBeneficiario
            beneficiario.Percetual = textPercentualBeneficiario;

            beneficiarios.push(beneficiario);

        });

        seguro.Benificiarios = beneficiarios;

        seguro.DataAquisicaoApolice = $('#DataAquisicaoApolice').val();
        seguro.ValorPremio = $('#ValorPremio').val();

        var frequencia = parseInt($('#Frequencia').val())

        if (isNaN(frequencia)) {
            frequencia = 0;
        }

        seguro.Frequencia = frequencia;
        seguro.Porque = $('#Porque').val();

        $.ajax({

            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },

            type: "post",
            dataType: "text",
            url: "/Home/SaveProgress/",
            data: JSON.stringify(seguro),

            success: function (retorno) {
            },

            error: function () {
            }

        });

        console.log(seguro);
    }

    function Delete() {
        return;
    }

});
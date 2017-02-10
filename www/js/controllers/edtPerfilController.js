app.controller('edtPerfilIncCtrl', ['$scope', '$stateParams', '$http',
    '$cordovaToast', '$cordovaNetwork', '$ionicLoading', '$ionicPopup', '$location', '$timeout', '$q', '$cordovaCamera', '$ionicActionSheet',

    function($scope, $stateParams, $http, $cordovaToast,
        $cordovaNetwork, $ionicLoading, $ionicPopup, $location, $timeout, $q, $cordovaCamera, $ionicActionSheet) {
        $scope.edtPerfil = 'Editar Perfil';
        var usuario = JSON.parse(window.localStorage.getItem('usuario'));
        var inscrito = JSON.parse(window.localStorage.getItem('inscrito'));
        var estados = JSON.parse(window.localStorage.getItem('estados'));
        var imgPerfilInscri = inscrito.foto;
        var iconPerfil = document.getElementById('idFtPerfil');
        var idUser = usuario.id;
        var fotoInscrito, nomeInscrito, cpfInscrito, rgInscrito;
        var sexoInscrito, ufInscrito, cidadeInscrito, iesInscrito, celularInscrito;

        function getInscrito(inscrito) {
            $scope.inscritos = inscrito;
            var estadoInsc = inscrito.uf;
            $scope.ufEstados = estados;
            if (inscrito.sexo === 'M') {
                if (imgPerfilInscri === '') {
                    iconPerfil.src = 'img/user_male.png';
                } else {
                    iconPerfil.src = 'http://tda.intelligenceeventos.com.br/imagens/perfil_users/' + idUser + '/' + imgPerfilInscri;
                }
            }
            if (inscrito.sexo === 'F') {
                if (imgPerfilInscri === '') {
                    iconPerfil.src = 'img/user_female.png';
                } else {
                    iconPerfil.src = 'http://tda.intelligenceeventos.com.br/imagens/perfil_users/' + idUser + '/' + imgPerfilInscri;
                }
            }
        }
        getInscrito(inscrito);
        $scope.carregarPerfil = function() {
            getInscrito(inscrito);
            $location.path('/perfilPage');
        }

        $scope.mudarFotoPerfil = function() {
            // Show the action sheet
            var hideSheet = $ionicActionSheet.show({
                buttons: [
                    { text: '<b><i class="icon ion-camera"></i>Camera</b>' },
                    { text: '<b><i class="icon ion-image"></i>Escolher da Galeria</b>' }
                ],
                titleText: '<h5>Formas de Edição</h5>',
                cancelText: 'Cancelar',
                cancel: function() {
                    console.log('cancelando ActionSheet')
                },
                buttonClicked: function(index) {
                    switch (index) {
                        case 0:
                            // Recuperar foto como uma imagem codificada em base64
                            var options = {
                                quality: 50,
                                destinationType: Camera.DestinationType.DATA_URL,
                                sourceType: Camera.PictureSourceType.CAMERA,
                                allowEdit: true,
                                encodingType: Camera.EncodingType.JPEG,
                                targetWidth: 280,
                                targetHeight: 300,
                                saveToPhotoAlbum: true,
                                correctOrientation: true
                            }

                            $cordovaCamera.getPicture(options).then(function(imageData) {
                                $scope.imageDePerfilEdt = 'data:image/jpeg;base64,' + imageData;
                                fotoInscrito = $scope.imageDePerfilEdt;
                                console.log('Deu Certo');
                            }, function(err) {
                                // error
                                console.log('Não Deu Certo - ', err);
                            })
                            break

                        case 1:
                            // Recuperar foto como uma imagem codificada em base64
                            var options = {
                                quality: 50,
                                destinationType: Camera.DestinationType.DATA_URL,
                                sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
                                allowEdit: true,
                                encodingType: Camera.EncodingType.JPEG,
                                targetWidth: 280,
                                targetHeight: 300,
                                saveToPhotoAlbum: true,
                                correctOrientation: true
                            }

                            $cordovaCamera.getPicture(options).then(function(imageData) {
                                $scope.imageDePerfilEdt = 'data:image/jpeg;base64,' + imageData;
                                fotoInscrito = $scope.imageDePerfilEdt;
                                console.log('Deu Certo');
                            }, function(err) {
                                // error
                                console.log('Não Deu Certo - ', err);
                            })
                            break
                    }
                    return true;
                }
            })

            $scope.carregarPerfilEditado = function() {
                /*mandar img atual para o servidor e salvar o nome dela junto com a 
                extenção no bando de dados na table inscrito*/
                var inscrito = JSON.parse(window.localStorage.getItem('inscrito'));

                nomeInscrito = document.getElementById('idInputNome').value;
                cpfInscrito = document.getElementById('idInputCpf').value;
                rgInscrito = document.getElementById('idInputRg').value;
                iesInscrito = document.getElementById('idInputIes').value;
                celularInscrito = document.getElementById('idInputCel').value;
                console.log('fotoInscrito -> ', fotoInscrito);
                //pegando option de sexo que foi selecionado 
                var idSelectSexo = document.getElementById('idSelectSexo');
                var sexoSelecionado = idSelectSexo.options[idSelectSexo.selectedIndex].text;
                //pegando option de estado(uf) que foi selecionado 
                var idSelectEstado = document.getElementById('idSelectEstado');
                var estadoSelecionado = idSelectEstado.options[idSelectEstado.selectedIndex].text;
                //pegando option de cidade que foi selecionado 
                var idSelectCidade = document.getElementById('idSelectCidade');
                var cidadeSelecionado = idSelectCidade.options[idSelectCidade.selectedIndex].text;
                // $location.path('/perfilPage')
            }
        }
    }
]);
var app = new Vue({
    el: '#app',
    template: `
        <div class="conteudo">
            <div class="topo">
                <h4>Consulte a previsão do tempo para a sua cidade.</h4>
                <form>
                    <div class="input-group mb-3">
                        <div class="input-group-prepend">
                            <span class="input-group-text">Cidade</span>
                        </div>
                        <input v-model="newConsulta" type="text" class="form-control" autofocus="">
                        <input @click="addConsulta" type="submit" class="form-control btn btn-primary btn-ir" value="Ir">
                    </div>
                </form>
                
                
                
            </div>
            <!-- Toast de cidade não encontrada-->
                <div id="toast2" role="alert" aria-live="assertive" aria-atomic="true" class="mb-2 toast ocultar" data-autohide="false">
                    <div class="toast-header">
                        <div class="bg-danger boder rounded"> &nbsp; &nbsp; &nbsp; </div>
                        <strong class="mr-auto">&nbsp; Aviso!</strong>
                    </div>
                    <div class="toast-body">
                        Cidade não encontrada.
                    </div>
                </div>
            <div id="app-data">
                <h4><b>Tempo agora em {{cidade}}</b></h4>
                <div class="temperatura">
                    <img v-bind:src="imagem" v-bind:alt="tempo" v-bind:title="tempo">
                    <h5><i class="fa fa-thermometer-2"></i> <b>{{temperatura}}º C </b></h5>
                </div>
                
                <h4>{{tempo}}</h4>
                <h6>
                    <i class="fa fa-arrow-up text-danger"></i>
                    Máxima: <b>{{maxima}}º C </b>
                </h6>
                <h6>
                    <i class="fa fa-arrow-down text-primary"></i>
                    Mínima: <b>{{minima}}º C </b>
                </h6>
                <p>Vento Dir: {{vento}}º | Veloc. vento: {{velVento}}Km/h</p>
            </div>
            <div class="app-feeling">
                <!-- Toast de avaliação realizada -->
                <div id="toast1" role="alert" aria-live="assertive" aria-atomic="true" class="toast ocultar" data-autohide="false">
                    <div class="toast-header">
                        <div class="bg-success boder rounded"> &nbsp; &nbsp; &nbsp; </div>
        
                        <strong class="mr-auto">&nbsp; Aviso!</strong>
                    </div>
                    <div class="toast-body">
                        Avaliação realizada.
                    </div>
                </div>
                
                <p>Avalie nossa previsão</p>
                <form>
                    <div class="form-check-inline">
                        <i v-on:click="addAvaliacao(1)" class="fa fa-star-o fa-lg optradio-label" id="optradio-label1"></i>
                    </div>
                    <div class="form-check-inline">
                        <i v-on:click="addAvaliacao(2)" class="fa fa-star-o fa-lg optradio-label" id="optradio-label2"></i>
                    </div>
                    <div class="form-check-inline">
                        <i v-on:click="addAvaliacao(3)" class="fa fa-star-o fa-lg optradio-label" id="optradio-label3"></i>
                    </div>
                    <div class="form-check-inline">
                        <i v-on:click="addAvaliacao(4)" class="fa fa-star-o fa-lg optradio-label" id="optradio-label4"></i>
                    </div>
                    <div class="form-check-inline">
                        <i v-on:click="addAvaliacao(5)" class="fa fa-star-o fa-lg optradio-label" id="optradio-label5"></i>
                    </div>
                </form>
            </div>
            
            <!--    Modal das consultas-->
            <div class="modal fade" id="modalConsultas" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">Consultas realizadas</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <div class="consultas">
                                <div v-for="(consulta, n) in consultas" class="consulta">
                                    <p>
                                        <span class="consulta">{{ consulta }}</span>
                                    </p>
                                    <a href="#" class="text-danger" @click="removeConsulta(n)">remover</a>
                                </div>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-primary" data-bs-dismiss="modal">Fechar</button>
                        </div>
                    </div>
                </div>
            </div>
            <!--    Modal das avaliações -->
            <div class="modal fade" id="modalAvaliacoes" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">Avaliações realizadas</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <div class="avaliacoes">
                                <div v-for="(avaliacao, n) in avaliacoes" class="consulta">
                                    <p>
                                        <span class="avaliacao">{{ avaliacao }}</span>
                                    </p>
                                    <a href="#" class="text-danger" @click="removeAvaliacao(n)">remover</a>
                                </div>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-primary" data-bs-dismiss="modal">Fechar</button>
                        </div>
                    </div>
                </div>
            </div>
            
        </div>
    `,
    data: {
        consultas: [],
        avaliacoes: [],
        newConsulta: null,
        tempo: [],
        cidade: [],
        temperatura: [],
        maxima: [],
        minima: [],
        vento: [],
        velVento: [],
        imagem: [],
        cidadeBusca: 'Juazeiro do Norte',
        idConsulta: 0,
    },
    //Mostrar tempo na página inicial (sem busca)
    created: function mostrarTempo() {
        const self = this;

        const apiKey = 'e69c27fbc34fb1282fbabac3caafbaea'
        const options = '&units=metric&lang=pt_br&limit=3&appid='
        const city = self.cidadeBusca
        const apiUrlCity = 'https://api.openweathermap.org/geo/1.0/direct?q='+city+options+apiKey
        let cityBusca = ''

        $.get(apiUrlCity, function (dataGeoCode) {
            if(dataGeoCode[0]){
                cityBusca = dataGeoCode[0].name+','+dataGeoCode[0].country
                self.cidadeBusca = dataGeoCode[0].name

                let urlWeather = 'https://api.openweathermap.org/data/2.5/weather?q='+cityBusca+options+apiKey
                $.get(urlWeather, function (data){
                    self.tempo = data.weather[0].description
                    self.cidade = data.name
                    self.cidadeBusca = data.name
                    var tempArround = parseInt(data.main.temp)
                    self.temperatura = tempArround
                    var maxArround = parseInt(data.main.temp_max)
                    self.maxima = maxArround
                    var minArround = parseInt(data.main.temp_min)
                    self.minima = minArround
                    self.vento = data.wind.deg
                    self.velVento = data.wind.speed
                    self.imagem = "https://openweathermap.org/img/wn/"+data.weather[0].icon+"@2x.png"
                });

            } else {
                $('#toast2').removeClass('ocultar');
                $('#toast2').toast('show');
            }
        })

    },
    mounted(){
        if(localStorage.getItem('consultas')){
            try{
                this.consultas = JSON.parse(localStorage.getItem('consultas'));
            } catch (e) {
                localStorage.removeItem('consultas');
            }
        }
        if(localStorage.idConsulta){
            this.idConsulta = localStorage.idConsulta;
        }
    },
    methods: {
        //Cadastrar avaliações realizadas
        addAvaliacao: function (estrelas){

            let now = new Date();
            let dataHoraAvaliacao = now.getDate()+'/'+now.getMonth()+'/'+now.getFullYear()+', '+now.getHours()+':'+now.getMinutes();
            this.avaliacoes.push('#'+this.idConsulta+' - '+this.cidade+' | '+estrelas+' estrelas | '+dataHoraAvaliacao);
            this.saveAvaliacao();
            this.mensagemAvaliacao();
        },

        removeAvaliacao(x) {
            this.avaliacoes.splice(x, 1);
            this.saveAvaliacao();
        },

        saveAvaliacao(){
            const parsed = JSON.stringify(this.avaliacoes);
            localStorage.setItem('avaliacoes', parsed);
        },


        //Cadastrar consultas realizadas
        addConsulta(){
            //verificar se os dados foram informados
            if(!this.newConsulta){
                return;
            }

            //Buscando dados da cidade pesquisada
            this.cidadeBusca = this.newConsulta;
            this.buscarTempoCidade();

            //Construindo as linhas de consultas
            this.idConsulta++;
            let cityName = this.newConsulta.charAt(0).toUpperCase() + this.newConsulta.slice(1);
            let now = new Date();
            let dataHoraBusca = now.getDate()+'/'+now.getMonth()+'/'+now.getFullYear()+', '+now.getHours()+':'+now.getMinutes();
            this.consultas.push('#'+this.idConsulta+' - '+cityName+' | '+dataHoraBusca);
            this.newConsulta = '';
            this.saveConsulta();
        },

        removeConsulta(x) {
            this.consultas.splice(x, 1);
            this.saveConsulta();
        },

        saveConsulta(){
            const parsed = JSON.stringify(this.consultas);
            localStorage.setItem('consultas', parsed);
            const parsedIdConsulta = this.idConsulta;
            localStorage.setItem('idConsulta', parsedIdConsulta);
        },

        //Consultar tempo da busca
        buscarTempoCidade(){
            const self = this;

            const apiKey = 'e69c27fbc34fb1282fbabac3caafbaea'
            const options = '&units=metric&lang=pt_br&limit=3&appid='
            const city = self.cidadeBusca
            const apiUrlCity = 'https://api.openweathermap.org/geo/1.0/direct?q='+city+options+apiKey
            let cityBusca = ''

            $.get(apiUrlCity, function (dataGeoCode) {
                if(dataGeoCode[0]){
                    cityBusca = dataGeoCode[0].name+','+dataGeoCode[0].country

                    let urlWeather = 'https://api.openweathermap.org/data/2.5/weather?q='+cityBusca+options+apiKey
                    $.get(urlWeather, function (data){
                        self.tempo = data.weather[0].description
                        self.cidade = data.name
                        var tempArround = parseInt(data.main.temp)
                        self.temperatura = tempArround
                        var maxArround = parseInt(data.main.temp_max)
                        self.maxima = maxArround
                        var minArround = parseInt(data.main.temp_min)
                        self.minima = minArround
                        self.vento = data.wind.deg
                        self.velVento = data.wind.speed
                        self.imagem = "https://openweathermap.org/img/wn/"+data.weather[0].icon+"@2x.png"
                    });

                } else {
                    $('#toast2').removeClass('ocultar');
                    $('#toast2').toast('show');
                }
            })
        },
        mensagemAvaliacao(){
            $('#toast1').removeClass('ocultar');
            $('#toast1').toast('show');
        },
    }
})

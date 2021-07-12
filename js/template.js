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
                        <input v-model="newConsulta" type="text" class="form-control">
                        <input @click="addConsulta" type="submit" class="form-control btn btn-primary btn-ir" value="Ir">
                    </div>
                </form>
            </div>
            <div id="app-data">
                <h4><b>Tempo agora em {{cidade}}</b></h4>
                <div class="temperatura">
                    <img v-bind:src="imagem" v-bind:alt="tempo" v-bind:title="tempo">
                    <h5><i class="fa fa-thermometer-2"></i> <b>{{temperatura}}º C </b></h5>
                </div>
                
                <h4>{{tempo}}</h4>
                <h5>
                    <i class="fa fa-arrow-up text-danger"></i>
                    Máxima: <b>{{maxima}}º C </b>
                </h5>
                <h5>
                    <i class="fa fa-arrow-down text-primary"></i>
                    Mínima: <b>{{minima}}º C </b>
                </h5>
                <p>Vento Dir: {{vento}}º | Veloc. vento: {{velVento}}Km/h</p>
            </div>
            <div class="app-feeling">
                <p>Avalie nossa previsão</p>
                <form>
                    <div class="form-check-inline">
                        <label class="form-check-label" for="radio1">
                            <i class="fa fa-star-o fa-lg optradio-label" id="optradio-label1"></i>
                            <input type="radio" class="form-check-input optradio" name="optradio1" id="radio1" value="1">
                        </label>
                    </div>
                    <div class="form-check-inline">
                        <label class="form-check-label" for="radio2">
                            <i class="fa fa-star-o fa-lg optradio-label" id="optradio-label2"></i>
                            <input type="radio" class="form-check-input optradio" name="optradio2" id="radio2" value="2">
                        </label>
                    </div>
                    <div class="form-check-inline">
                        <label class="form-check-label" for="radio3">
                            <i class="fa fa-star-o fa-lg optradio-label" id="optradio-label3"></i>
                            <input type="radio" class="form-check-input optradio" name="optradio3" id="radio3" value="3">
                        </label>
                    </div>
                    <div class="form-check-inline">
                        <label class="form-check-label" for="radio4">
                            <i class="fa fa-star-o fa-lg optradio-label" id="optradio-label4"></i>
                            <input type="radio" class="form-check-input optradio" name="optradio4" id="radio4" value="4">
                        </label>
                    </div>
                    <div class="form-check-inline">
                        <label class="form-check-label" for="radio5">
                            <i class="fa fa-star-o fa-lg optradio-label" id="optradio-label5"></i>
                            <input type="radio" class="form-check-input optradio" name="optradio5" id="radio5" value="5">
                        </label>
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
            
        </div>
    `,
    data: {
        consultas: [],
        newConsulta: null,
        tempo: [],
        cidade: [],
        temperatura: [],
        maxima: [],
        minima: [],
        vento: [],
        velVento: [],
        imagem: [],
        cidadeBusca: 'Juazeiro do Norte'
    },
    created: function mostrarTempo() {
        const self = this;

        const apiKey = 'e69c27fbc34fb1282fbabac3caafbaea'
        const options = '&units=metric&lang=pt_br&limit=3&appid='
        const city = self.cidadeBusca
        const apiUrlCity = 'http://api.openweathermap.org/geo/1.0/direct?q='+city+options+apiKey
        let cityBusca = ''

        $.get(apiUrlCity, function (dataGeoCode) {
            console.log(dataGeoCode)
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
                    self.imagem = "http://openweathermap.org/img/wn/"+data.weather[0].icon+"@2x.png"
                    console.log(self.consultas)
                });

            } else {
                alert('Cidade não encontrada')
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
    },
    methods: {
        addConsulta(){
            //verificar se os dados foram informados
            if(!this.newConsulta){
                return;
            }
            this.cidadeBusca = this.newConsulta;
            this.buscarTempoCidade();
            this.consultas.push(this.newConsulta);
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
        },

        //Consultar tempo da busca
        buscarTempoCidade(){
            const self = this;

            const apiKey = 'e69c27fbc34fb1282fbabac3caafbaea'
            const options = '&units=metric&lang=pt_br&limit=3&appid='
            const city = self.cidadeBusca
            const apiUrlCity = 'http://api.openweathermap.org/geo/1.0/direct?q='+city+options+apiKey
            let cityBusca = ''

            $.get(apiUrlCity, function (dataGeoCode) {
                console.log(dataGeoCode)
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
                        self.imagem = "http://openweathermap.org/img/wn/"+data.weather[0].icon+"@2x.png"
                        console.log(self.consultas)
                    });

                } else {
                    alert('Cidade não encontrada')
                }
            })
        }
    }
})
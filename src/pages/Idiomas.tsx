import React, { useEffect, useState } from 'react';
import '../styles/idiomas.css'
import {defaults, Doughnut} from 'react-chartjs-2'
import Header from '../components/Header';
import api from '../services/api';
import {Checkbox} from '@material-ui/core'

defaults.global.legend.position = 'right'

interface countryInterface{
    population:number,
    languages:{name:string}[]
}
interface selectedInterface{
    [key: string]: boolean
}
interface languagesInterface{
    langName:string,
    qtd:number
}


function Idiomas() {

    const [chartData, setChartData] = useState({})

    const [selected, setSelected] = useState<selectedInterface>({
        africa:true,
        americas:true,
        asia:true,
        europe:true,
        oceania:true,
    })
    const [selectAllChecked, setSelectAllChecked] = useState(true)


    const [othersLanguages, setOthersLanguages] = useState(0)

    useEffect(()=>{
        //verificando se todos estão selecionados
        setSelectAllChecked(Object.values(selected).every(e=>e))
        chart()
    },[selected])

    function chart(){
        let languages:languagesInterface[] =[]

        setChartData({})
        setOthersLanguages(0)

        Object.keys(selected).forEach(cont=>{
            if(selected[cont]){
                api.get(`region/${cont}`).then(resp=>{
                    resp.data.forEach((country:countryInterface)=>{
                        country.languages.forEach(lang=>{

                            //  Pegando index de lang na array. Caso não exista retorna -1
                            let pos = languages.map(l=>l.langName).indexOf(lang.name)

                            if(pos>=0){ //Se lang já foi adicionado
                                languages[pos].qtd++
                            }else{ //Caso lang não exista ainda na array
                                languages.push({
                                    langName: lang.name,
                                    qtd: 1
                                })
                            }
                        })
                    })

                    //  Copiando languages
                    let languagesCopy = languages.slice(0)

                    //  Ordenando (decrescente) languages por quantidade
                    languagesCopy.sort((a,b) => (a.qtd > b.qtd) ? -1 : ((b.qtd > a.qtd) ? 1 : 0))

                    //  filtrando os 10 idiomas que mais aparecem

                    setOthersLanguages(languagesCopy.slice(10,languagesCopy.length-1).length)

                    languagesCopy = languagesCopy.slice(0,10)

                    //  Atualizando dados do gráfico:
                    setChartData({
                        labels:languagesCopy.map(l=>l.langName),
                        datasets:[
                            {
                            data: languagesCopy.map(l=>l.qtd),
                            backgroundColor: ['#830000','#b00000','#ff0000','#ff301c','#FF5043',
                                            '#ff6067','#ff9b8e','#ff9eae','#ffcebe','#ff9dee'],
                            }
                        ]
                        }
                    )

                })
            }
        })
    }


    function selectAll(value:boolean){
        setSelectAllChecked(value)
        setSelected(
            {
                africa:value,
                americas:value,
                asia:value,
                europe:value,
                oceania:value,
            }
        )
    }

    return (
    <div className="Page-container">
        <Header selected={3}/>
        <main>
            <div className="message">
                <p>
                    O gráfico circular a seguir apresenta a quantidade de países que falam determinado
                    idioma nos continentes que estão sendo considerados.
                </p>
                <p>O gráfico apresenta apenas os 10 idiomas mais falados nos continentes em questão.</p>
            </div>
            <div className="main-content">
                <div className="config-menu">
                    <h2>Considerando os continentes:</h2>
                    <div className="options">
                        <div className="select-continent">
                            <Checkbox
                                color='default'
                                className="checkbox"
                                checked={selectAllChecked}
                                onChange={e=>selectAll(e.target.checked)}
                            />
                            <label>ALL</label>
                        </div>
                        {Object.keys(selected).map(cont=>{
                            return(
                                <div key={`${cont}-select`} className="select-continent">
                                    <Checkbox
                                        color='default'
                                        className="checkbox"
                                        checked={selected[cont]}
                                        onChange={e=>setSelected({...selected,[cont]:e.target.checked})}
                                    />
                                    <label>{cont.toUpperCase()}</label>
                                </div>
                            )
                        })}
                    </div>

                </div>
                <div className="chart-container">
                    <Doughnut
                        data={chartData}
                        height={400}
                        width={400}
                        options={{
                            maintainAspectRatio: false,
                            responsive: true,
                            legend: {
                                display: true,
                                labels: {
                                    fontSize: 20,
                                    boxWidth: 40,
                                    padding: 10,
                                }
                            }
                        }}
                    />
                    {othersLanguages>0
                    &&(
                        <p className="others-languages">+ {othersLanguages} idiomas</p>
                    )
                    }
                </div>
            </div>
        </main>
    </div>
    );
}

export default Idiomas;

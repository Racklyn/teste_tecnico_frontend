import React, { useEffect, useState } from 'react';
import '../styles/paisesPop.css'
import {Bar} from 'react-chartjs-2'
import Header from '../components/Header';
import api from '../services/api';
import {GiRollingDices} from 'react-icons/gi'
import {CircularProgress} from '@material-ui/core'

interface countryInterface{
    name:string;
    population:number,
    flag:string
}

function PaisesPop() {

    const [chartData, setChartData] = useState({})
    const [countries, setCountries] = useState<countryInterface[]>([])

    useEffect(()=>{
        drawCountries()
    },[])

    // Sortear países e mostrá-los no gráfico
    function drawCountries(){
        let randomCountries: countryInterface[]= []
        let min=0
        let max=0
        setCountries([])
        api.get('all?fields=name;population;flag').then(resp=>{
            let all = resp.data
            for(var i=0;i<8;i++){
                let random: countryInterface
                let reps = 0
                do{
                    reps++
                    random = all[Math.floor(Math.random()*all.length)]
                    //  Pegando menor e maior população da lista
                    let preview = [...randomCountries.map(c=>c.population),random.population]
                    min = Math.min(...preview)
                    max = Math.max(...preview)
                }while(
                    (randomCountries.includes(random) ||
                    //  não pegar países com populações muito distintas
                    max > 25*min) &&
                    reps<all.length
                )
                //evitando um loop infinito, recomeçando o sorteio aleatório
                if(reps>=all.length){
                    drawCountries()
                    break;
                }else{ //caso tudo tenha corrido bem
                    randomCountries.push(random)
                }
            }
            setCountries(randomCountries)

            //  Atualizando dados do gráfico:
            setChartData({
                labels:randomCountries.map(c=>c.name.slice(0,13)),
                datasets:[
                    {
                    label: "população do país",
                    data: randomCountries.map(c=>c.population),
                    backgroundColor: ['#830000','#b00000','#ff0000','#ff301c',
                                    '#FF5043','#ff6067','#ff9b8e','#ff9eae'],
                    }
                ]
            })
        })
    }

    return (
    <div className="Page-container">
        <Header selected={2}/>
        <main>
            <div className="message">
                <p>
                    O gráfico de barras a seguir apresenta a comparação entre as populações de alguns países
                    escolhidos de forma aleatória.
                </p>
            </div>
            <div className="main-content">
                <div className="config-menu">
                    <h2>Países:</h2>
                    {countries.length>0?
                        <div className="countries-container">
                            {countries.map(country=>{
                                return(
                                    <span key={`${country.name}-icon`} className="country">
                                        <img src={country.flag} alt="flag"/>
                                        <p>{country.name}</p>
                                    </span>
                                )
                            })}
                        </div>
                        :
                        (<div className="progress-container">
                            <CircularProgress className="progress" color='inherit'/>
                        </div>
                        )
                    }
                    
                    <button className="random-button" onClick={()=>drawCountries()}>
                        <GiRollingDices size={28} /> Sortear
                    </button>
                    
                </div>
                <div className="chart-container">
                    <Bar
                        data={chartData}
                        height={400}
                        width={400}
                        options={{
                            maintainAspectRatio: false,
                            responsive: true,
                            scales: {
                                yAxes: [
                                    { 
                                        ticks: { beginAtZero: true } 
                                    }
                                ]
                            },
                            legend: {
                                display: false,
                            }
                        }}
                    />
                </div>
            </div>
        </main>
    </div>
    );
}

export default PaisesPop;

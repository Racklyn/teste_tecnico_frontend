import React, { useEffect, useState } from 'react';
import '../styles/paisesPop.css'
import {Bar} from 'react-chartjs-2'
import Header from '../components/Header';
import api from '../services/api';

function PaisesPop() {

    interface countryInterface{
        name:string;
        population:number,
        flag:string
    }

    const [chartData, setChartData] = useState({})
    const [countries, setCountries] = useState<countryInterface[]>([])

    useEffect(()=>{
        randomCountries()
    },[])

    function randomCountries(){
        let randomCountries: countryInterface[]= []
        let min=0
        let max=0
        
        api.get('all?fields=name;population;flag').then(resp=>{
            let all = resp.data
            for(var i=0;i<8;i++){
                let random: countryInterface
                do{
                    random = all[Math.floor(Math.random()*all.length)]
                    min = Math.min(...randomCountries.map(c=>c.population),random.population)
                    max = Math.max(...randomCountries.map(c=>c.population),random.population)
                }while(
                    randomCountries.includes(random) ||
                    max>20*min
                    )

                randomCountries.push(random)
            }
            updateData(randomCountries)
            setCountries(randomCountries)
        })
    }

    function updateData(data:countryInterface[]){
        setChartData({
            labels:data.map(c=>c.name.slice(0,13)),
            datasets:[
                {
                label: "população dos países",
                data: data.map(c=>c.population),
                
                backgroundColor: [
                  '#830000',
                  '#b00000',
                  '#ff0000',
                  '#ff301c',
                  '#FF5043',
                  '#ff6067',
                  '#ff9b8e',
                  '#ff9eae',
                ],

                }
            ]
        })
    }

    return (
    <div className="Page-container">
        <Header selected={2}/>
        <main>
            <p className="message">
                O gráfico de barras a seguir apresenta a comparaão entre as populações de alguns países
                escolhidos de forma aleatória. Clique no botão "Aleatório" para analisar outros países...
            </p>
            <div className="main-content">
                <div className="config-menu">
                    <h2>Países:</h2>
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
                    <button className="random-button" onClick={()=>randomCountries()}>Aleatório</button>
                    
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

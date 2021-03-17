import React, { useEffect, useState } from 'react';
import '../styles/paisesPop.css'
import {Bar, defaults} from 'react-chartjs-2'
import Header from '../components/Header';

defaults.global.legend.display = false
defaults.global.legend.position = 'bottom'

function PaisesPop() {

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
                        <div className="left-countries">
                            <span className="country">
                                <img src="https://restcountries.eu/data/bra.svg" alt="Bra"/>
                                <p>Brasil</p>
                            </span>
                            <span className="country">
                                <img src="https://restcountries.eu/data/arg.svg" alt="Arg"/>
                                <p>Brasil</p>
                            </span>
                            <span className="country">
                                <img src="https://restcountries.eu/data/col.svg" alt="Col"/>
                                <p>Brasil</p>
                            </span>
                            <span className="country">
                                <img src="https://restcountries.eu/data/usa.svg" alt="Usa"/>
                                <p>Brasil</p>
                            </span>
                        </div>
                        <div className="rigth-countries">
                            <span className="country">
                                <img src="https://restcountries.eu/data/can.svg" alt="Can"/>
                                <p>Brasil</p>
                            </span>
                            <span className="country">
                                <img src="https://restcountries.eu/data/mex.svg" alt="Arg"/>
                                <p>Brasil</p>
                            </span>
                            <span className="country">
                                <img src="https://restcountries.eu/data/dza.svg" alt="Col"/>
                                <p>Brasil</p>
                            </span>
                            <span className="country">
                                <img src="https://restcountries.eu/data/deu.svg" alt="Col"/>
                                <p>Brasil</p>
                            </span>
                        </div>
                        
                        

                    </div>
                    <button className="random-button">Aleatório</button>
                    
                </div>
                <div className="chart-container">
                    <Bar
                        data={{
                        labels:["p1","p2","p3","p4","p5", "p6", "p7", "p8"],
                        datasets:[
                            {
                            
                            data: [6,2,5,4,3,5,8,4],
                            
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
                        }}
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

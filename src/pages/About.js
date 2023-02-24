import React from 'react';
import logo from '../images/browser-party-logo.png'
import pawn from '../images/pawn-piece.png'
import ace from '../images/ace-card.png'
import dice from '../images/dice.png'
import spiece from '../images/s-piece.png'

export default function About() {
    const styles = {
        logo: {
            margin: '10vh auto 0px auto',
        },
        component: {
            width: '700px',
            // height: '400px',
            margin: '0 auto'
        }
    }
    return (
        <div>
            <img style={styles.logo} className="component-logo" alt="Browser Party logo" src={logo}></img>
            <div style={styles.component} className="component">
                <table style={{ textAlign: 'center', width: '700px', height: '800px', margin: '20px auto 0', fontSize: '15px' }}>
                    <tr>
                        <td style={{ width: '50%', height: '50%', padding: '0 15px' }}>
                            <img style={{ maxHeight: '180px', margin: '0 5px 5px 0' }} src={pawn} />
                            <br></br>
                            <h4>Henry Weigand</h4>
                            <p style={{ textAlign: 'left' }}>
                                Recent Univerity of Washington Civil Engineering graduate hoping to break into the web development world.
                                Favorite hobbies are soccer, video games, and winning pub trivia competitions!
                            </p>
                        </td>
                        <td style={{ padding: '0 15px' }}>
                            <img style={{ marginTop: '10px', maxHeight: '170px', margin: '0 5px 5px 0' }} src={dice} />
                            <br></br>
                            <h4>Reid Flamm</h4>
                            <p style={{ textAlign: 'left' }}>
                                Game developer and recent CTO for a Seattle-based tech start up. He has also expanded his pursuits to computer programming and 3D spatial mapping in the world of laser scanning and digital capture.
                            </p>
                        </td>
                    </tr>
                    <tr>
                        <td style={{ padding: '0 15px' }}>
                            <img style={{ maxHeight: '180px', margin: '0 5px 5px 0' }} src={ace} />
                            <br></br>
                            <h4>Ronnel Abrigo</h4>
                            <p style={{ textAlign: 'left' }}>
                                A creative person that enjoys making music, dancing, performing, and making videos. After working as a technician, he decided to follow through with an idea prompted by the pandemic: pursue a career path in tech.
                            </p>
                        </td>
                        <td style={{ padding: '0 15px' }}>
                            <img style={{ marginTop: '20px', maxHeight: '160px', margin: '0 5px 5px 0' }} src={spiece} />
                            <br></br>
                            <h4>Spencer Nelson</h4>
                            <p style={{ textAlign: 'left' }}>
                                Aspiring Full Stack Developer in the Seattle Area. Originally from Shreveport, LA, favorite hobbies are Ultimate Frisbee, video games, and hiking/camping with dog Domino.
                            </p>
                        </td>
                    </tr>
                </table>
            </div>
        </div>);
}
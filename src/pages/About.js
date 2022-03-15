import React from 'react';

export default function About() {
    const styles = {
        logo: {
            margin: '10vh auto 0px auto',
        },
        component: {
            width: '600px',
            height: '400px',
            margin: '0 auto'
        }
    }
    return (
        <div>
            <img style={styles.logo} className="component-logo" alt="Browser Party logo" src="/images/browser-party-logo.png"></img>
            <div style={styles.component} className="component"></div>
        </div>);
}
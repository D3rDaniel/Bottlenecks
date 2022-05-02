import React from 'react';
import ReactDOM from 'react-dom';

export default function HelloReact() {
    return (

            <div class="mx-auto mt-8 w-48" >
                <h2 class="text-3xl font-bold">Hi Mom!👋</h2>
            </div>
        
    );
}

if (document.getElementById('root')) {
    ReactDOM.render(<HelloReact />, document.getElementById('root'));
}
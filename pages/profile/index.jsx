import React from 'react'
import PrivateLayout from '../../components/PrivateLayout'

function index() {
    return (
        <div>
            <PrivateLayout>
                <div style={{marginTop: '250px'}}>
                    content
                </div>
            </PrivateLayout>
        </div>
    )
}

export default index

// Creates a printable page for the specific court with a qr code
import { Button } from "@mui/material";
import React from "react";
import { Link, useParams } from "react-router-dom";

const PrintCourtQRCode = (props: any): JSX.Element => {

    // TODO THIS SHOULD PROBABLY BE A MODAL ON THE PARK PAGE AVAILABLE TO ADMINS RATHER THAN ITS OWN PAGE,
    // IN THAT CASE IT WOULD GET COURTID AS A PROP AND NOT URL PARAMETER IDK, SHOULD WORK EITHER WAY HONESTLY.

    // court id should be passed in the url, 
    const { courtId } = useParams();

    const urlToEmbed = "https://localhost:3000/courtQR/" + courtId

    // get QR code from this endpoint with these instructions:
    /*
         could use window.innerWidth and window.innerHeight to make QR code take up portion of window?

        Call the URL https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=Example to get a QR code with the content "Example":

        use GET and 
        content-type: image/x-icon
        to get the image then somehow put it in a tag?, or just grab img tag that comes in HTML
        OR use their documentation's hint and:
        As you can see, it's easy to embed a QR code in your (X)HTML documents by using the <img> tag. The <img> tag
        <img src="https://api.qrserver.com/v1/create-qr-code/?data=HelloWorld&amp;size=100x100" alt="" title="" />
    */

    const printPage = async() => {
        const printableComponent = document.getElementById('PrintPage');
        const printableElements = printableComponent != null ? printableComponent.innerHTML : null;
        if (printableElements == null) { return; }
        else {
            const orderHtml: string = await '<html><head><title></title></head><body>' + printableElements + '</body></html>'
            const oldPage = await document.body.innerHTML;
            document.body.innerHTML = await orderHtml;
            await window.print();
            document.body.innerHTML = await oldPage;
        }
    }


    return (
        <div>
            <div id="PrintPage" >
            {/* ONLY PRINTS OUT THIS WHOLE COMPONENT BEAUTIFULLY */}
                <div style={{display:'flex', flexDirection:'column', alignItems:'center'}}>
                    <h1> WenDiGo logo here</h1>
                    <h2 style={{color:'green'}}>Court name is: </h2>
                    <h2>Facility name is: </h2>
                    <h2>Facility address is: </h2>
                    <h2>Park name is: </h2>
                    <p>_______________________________________________________</p>
                    <img src={`https://api.qrserver.com/v1/create-qr-code/?data=${urlToEmbed}&size=400x400`} alt="A QR code for the given court" title="" />
                    <p>_______________________________________________________</p>
                    <h2>idk facility info here</h2>
                    <h3 style={{color:'blue'}}> our website url here: https://google.com </h3>
                </div>
            </div>
            <Button 
                onClick={printPage}
                variant="contained"
            >
                print page
            </Button>
        </div>

    )
}


export default PrintCourtQRCode;
import React, {Component } from 'react'
import Grid from '@material-ui/core/Grid';
import compose from 'recompose/compose';
import { withStyles } from '@material-ui/core';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import { resolve } from 'url';

const styles = {
    root: {
        flexGrow: 1
    },
    sizeCvs: {
        border: "1px solid black"
    }
}
class RotateImage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            file:"",
            ctx:"",
            raw:""
        };
    }
    getSourceOrientation() {
        return new Promise((resolve, reject) => {
            var reader = new FileReader();
            reader.onload = function (e) {

                var view = new DataView(e.target.result);
                if (view.getUint16(0, false) != 0xFFD8) reject(-2);
                var length = view.byteLength, offset = 2;
                while (offset < length) {
                    var marker = view.getUint16(offset, false);
                    offset += 2;
                    if (marker == 0xFFE1) {
                        if (view.getUint32(offset += 2, false) != 0x45786966) reject(-1);
                        var little = view.getUint16(offset += 6, false) == 0x4949;
                        offset += view.getUint32(offset + 4, little);
                        var tags = view.getUint16(offset, little);
                        offset += 2;
                        for (var i = 0; i < tags; i++)
                            if (view.getUint16(offset + (i * 12), little) == 0x0112)
                                resolve(view.getUint16(offset + (i * 12) + 8, little));
                    }
                    else if ((marker & 0xFF00) != 0xFF00) break;
                    else offset += view.getUint16(offset, false);
                }
                reject(-1);
            };
            reader.readAsArrayBuffer(this.state.raw);
        })
    }
    rotateImage(srcOrientation) {
        return new Promise((resolve, reject) => {
        var img = new Image();    
          
        img.onload = () => {
            debugger;
            var width = img.width,
                height = img.height,
                cvs = this.refs.cvs,
                ctx = cvs.getContext("2d");
          
             
              if (4 < srcOrientation && srcOrientation < 9) {
                cvs.width = height;
                cvs.height = width;
              } else {
                cvs.width = width;
                cvs.height = height;
              }
          
              
              switch (srcOrientation) {
                case 2: ctx.transform(-1, 0, 0, 1, width, 0); break;
                case 3: ctx.transform(-1, 0, 0, -1, width, height ); break;
                case 4: ctx.transform(1, 0, 0, -1, 0, height ); break;
                case 5: ctx.transform(0, 1, 1, 0, 0, 0); break;
                case 6: ctx.transform(0, 1, -1, 0, height , 0); break;
                case 7: ctx.transform(0, -1, -1, 0, height , width); break;
                case 8: ctx.transform(0, -1, 1, 0, 0, width); break;
                default: break;
              }
          
              ctx.clearRect(0, 0, this.refs.cvs.width, this.refs.cvs.height);
              ctx.drawImage(img, 0, 0);
          
              
              resolve(cvs.toDataURL());
            };
          
            img.src = this.state.file;
        })
    }
    updateCvs() {
        const ctx = this.refs.cvs.getContext('2d');
        var img = new Image();
        img.onload = () => {
            console.log(img.width)
            console.log(img.height)
            /* if(img.width > WIDTH) {
                img.height = (img.height / img.width) * WIDTH;
                img.width = WIDTH;
            } */

            ctx.clearRect(0, 0, this.refs.cvs.width, this.refs.cvs.height);
            this.refs.cvs.width = img.width;
            this.refs.cvs.height = img.height;
            ctx.drawImage(img, 0, 0, img.width, img.height);
        }
        img.setAttribute('src', this.state.file);
    }

    componentDidUpdate(prevProps) {
        if(prevProps.file !== this.props.file) {
            if(this.props.file) {
                let { file } = this.props;
                this.setState({raw: file})
                let reader = new FileReader();
                reader.readAsDataURL(file)
                reader.onloadend = () => {
                    this.setState({open: true, file:reader.result});
                }
            }
        }
    }
    handleRotateLeft = async () => {
       let srcOrientation = await this.getSourceOrientation()
        console.log(srcOrientation);
        let image = await this.rotateImage(srcOrientation)
        console.log(image)
        
    }
    handleRotateRight = () => {
        const ctx = this.refs.cvs.getContext('2d');
        const WIDTH = 800;
        var img = new Image();
        img.onload = () => {
            console.log(img)
            if(img.width > WIDTH) {
                img.height = (img.height / img.width) * WIDTH;
                img.width = WIDTH;
            }

            ctx.clearRect(0, 0, this.refs.cvs.width, this.refs.cvs.height);
            this.refs.cvs.width = img.width;
            this.refs.cvs.height = img.height;
            
            console.log(img.width-img.height / 2)
            ctx.translate(0.5 * img.width, 0.5 * img.height);
            //ctx.setTransform(1,0,0,1,0,0);
            ctx.rotate(-90 * Math.PI / 180);
            //this.refs.cvs.width = img.height;
            ctx.drawImage(img, (-.5 * img.width) , (-.5*img.height) - 175, img.width, img.height);
            //this.refs.cvs2.width = 349;
            //this.refs.cvs2.height = img.height;
            //this.refs.cvs2.getContext('2d').drawImage(this.refs.cvs,0,0,img.width,img.height,0,0,img.width,img.height);
        }
        img.setAttribute('src', this.state.file);
    }
    handleClose = () => this.setState({open: false});
    handleEntered = () => {
        console.log('entered the dialog')
        this.updateCvs();
    }
    render() {
        const { classes } = this.props;
        return (
            <div className={classes.root}>
                <Dialog
                    fullScreen
                        open={this.state.open}
                        onClose={this.handleClose}
                        aria-labelledby="image-rotate"
                        onEntered={this.handleEntered}
                    >
                    <canvas ref="cvs" className={classes.sizeCvs}></canvas>
                    <canvas ref="cvs2" className={classes.sizeCvs}></canvas>
                    <DialogActions>
                        <Button onClick={this.handleRotateLeft} color="primary">
                            rotate left
                        </Button>
                        
                        <Button onClick={this.handleRotateRight}  color="primary">
                            rotate right
                        </Button>

                        <Button onClick={this.handleClose} color="primary">
                            save and close
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        )  
    }

}

export default compose(
    withStyles(styles)
)(RotateImage)
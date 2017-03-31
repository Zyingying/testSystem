const React = require('react');
const ReactDom = require('react-dom');
const THRESHOLD = 10;

function MakeSlidable(Child){
    class Slidable extends React.Component{
        constructor(props){
            super(props);
            this.onTouchStart = this.onTouchStart.bind(this);
            this.onTouchMove = this.onTouchMove.bind(this);
            this.onTouchEnd = this.onTouchEnd.bind(this);
            this.onDocumentTouch = this.onDocumentTouch.bind(this);
        }

        componentWillUnmount(){
            let child = ReactDom.findDOMNode(this.refs.child);
            document.documentElement.removeEventListener('touchmove', this.onDocumentTouch);
            child.removeEventListener('touchstart', this.onTouchStart);
            child.removeEventListener('touchmove', this.onTouchMove);
            child.removeEventListener('touchend', this.onTouchEnd);
        }

        componentDidMount(){
            let child = ReactDom.findDOMNode(this.refs.child);
            document.documentElement.addEventListener('touchmove', this.onDocumentTouch);
            child.addEventListener('touchstart', this.onTouchStart);
            child.addEventListener('touchmove', this.onTouchMove);
            child.addEventListener('touchend', this.onTouchEnd);
        }

        onDocumentTouch(e){
            let child = ReactDom.findDOMNode(this.refs.child);
            let target = e.target;
            let parent = target.parentNode;
            let include = false;

            while(parent){
                if(parent !== child) {
                    parent = parent.parentNode;
                }else{
                    include = true;
                    break;
                }
            }

            let disX = Math.abs(this.startX - this.lastX);
            let disY = Math.abs(this.startY - this.lastY);

            if(include && disY <= THRESHOLD*5 && disX > THRESHOLD){
                e.preventDefault();
            }
        }

        onTouchStart(e){
            this.startX = this.lastX = e.touches[0].clientX;
            this.startY = this.lastY = e.touches[0].clientY;
            try{
                this.refs.child.onSlideStart(this.startX, this.startY);
            }catch(e){}
        }

        onTouchEnd(e){
            let disX = this.lastX - this.startX;
            let disY = this.lastY - this.startY;

            try{
                this.refs.child.onSlideEnd(disX, disY);
            }catch(e){}

            delete this.lastX;
            delete this.lastY;
        }

        onTouchMove(e){
            // e.stopPropagation();

            let lastX = this.lastX;
            let lastY = this.lastY;
            let curX = e.changedTouches[0].clientX;
            let curY = e.changedTouches[0].clientY;

            let disY = Math.abs(curY - this.startY);
            let disX = Math.abs(curX - this.startX);

            if(disY >= THRESHOLD) {
                if (curY <= lastY) {
                    try {
                        this.refs.child.onSlideUp(-disY);
                    } catch (e) {
                    }
                } else {
                    try {
                        this.refs.child.onSlideDown(disY);
                    } catch (e) {
                    }
                }
            }

            if(disX >= THRESHOLD) {
                if (curX <= lastX) {
                    try {
                        this.refs.child.onSlideLeft(-disX);
                    } catch (e) {
                    }
                } else {
                    try {
                        this.refs.child.onSlideRight(disX);
                    } catch (e) {
                    }
                }
            }

            this.lastX = curX;
            this.lastY = curY;
        }

        render(){
            return <Child ref="child" {...this.props} />
        }
    }

    return Slidable;
}

module.exports = MakeSlidable;
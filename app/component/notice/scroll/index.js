
const Scroll = function(){

}

Scroll.prototype.init = function(elementId){
    this.destroy()
    this.element= document.getElementById(elementId);
    this.element.innerHTML += this.element.innerHTML;
    this.height = this.element.offsetHeight;
    this.maxHeight = this.element.scrollHeight/2;
    this.counter=0;
    this.timer="";
    this.scroll()
}

Scroll.prototype.scroll = function(){
    if(this.element.scrollTop < this.maxHeight){
        this.element.scrollTop++;
        this.counter++;
    }else{
        this.element.scrollTop=0;
        this.counter=0;
    }
    if(this.counter<this.height){
        this.timer=setTimeout(this.scroll.bind(this),20);
    }else{
        this.counter=0;
        this.timer=setTimeout(this.scroll.bind(this),5000);
    }
}

Scroll.prototype.stop = function(){
    clearTimeout(this.timer);
}

Scroll.prototype.destroy = function(){
    this.stop();
    this.element = null;
}

export default Scroll
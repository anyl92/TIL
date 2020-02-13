import React, {Component} from "react";
import $ from "jquery/dist/jquery";
import './Politics.css';
import ArticleRight from './ArticleRight';


class ArticleFrame extends Component {

    constructor(props) {
        super(props);
        // this.news_1 = React.createRef();
        this.newsContents = this.props.location.state;
        this.state = {
            focusIndex : 0
            // news_1_Height : 0
            // newsContents : this.props.location.state
        };
    }
    
    componentDidMount(){
        // console.log('get contents1', this.props.location.state)
        // console.log('get contents tmp', this.newsContents)
        
        // var windowHeightSize = (window.innerHeight - this.news_1.current.height)/2;
        // console.log(this.news_1.current.getBoundingClientRect())
        // console.log(this.news_1);
        // console.log(this.news_1.current.height)
        // console.log(this.news_1.current.width)
        // console.log(windowHeightSize)     
    }

    componentDidUpdate(){
        // console.log('get contents3', this.props.location.state)
        // console.log('get contents tmp', this.newsContents)
    }

    onScroll = event => {

        // console.log('articleScrollSection', this.articleScrollSection.current.style.overflow);

        // this.articleScrollSection.current.style.overflow = "scroll";
        var copyThis = this;
        const wheelEvent = event.nativeEvent;
        var elm = ".articleImageA";
        $(elm).each(function (index) {
            // 개별적으로 Wheel 이벤트 적용
            $(this).on("mousewheel DOMMouseScroll", function (e) {
                e.preventDefault();
                var delta = 0;
                if (!event) event = window.event;
                // console.log("event.wheelDelta값", wheelEvent.wheelDelta);
                // console.log("event.datail값", event);
                if (wheelEvent.wheelDelta) {
                    delta = wheelEvent.wheelDelta / 120;
                    if (window.opera) delta = -delta;
                } 
                else if (wheelEvent.detail)
                    delta = -event.detail / 3;
                // var moveTop = $(".articleLeftA").scrollTop();
                var moveTop = $(window).scrollTop();
                var elmSelecter = $(elm).eq(index);

                console.log("delta값", delta);
                console.log('index값', index);
                copyThis.setState({
                    focusIndex : index
                });
                // console.log('img height값', $(elmSelecter)[0].height);
                // console.log("old moveTop값", moveTop);
                // console.log("elmSelecter값", $(elmSelecter.offset().top));
                // console.log("elmSelecter.prev값", $(elmSelecter).prev());
                // console.log("elmSelecter.next값", $(elmSelecter).next());
                // 마우스휠을 위에서 아래로
                if (delta < 0) {
                    console.log("아래로가자");
                    // if (elmSelecter[0].nextSibling !== null) {
                    if ($(elmSelecter).next() !== undefined) {
                        console.log("갈 곳이 있어");
                        try{  
                            // moveTop = $(elmSelecter).next().offset().top;
                            // moveTop = $(elmSelecter).offset().top + 1.5*$(elmSelecter)[0].height - 0.5*window.innerHeight;
                            moveTop = $(elmSelecter).offset().top + $(elmSelecter)[0].height - (window.innerHeight - $(elmSelecter)[0].height)/2;
                        }catch(e){}
                    }
                } else {
                // 마우스휠을 아래에서 위로
                    console.log("위로가자");
                    if ($(elmSelecter).prev() !== undefined) {
                        console.log("갈 곳이 있어");
                        try{
                            moveTop = $(elmSelecter).prev().offset().top - (window.innerHeight - $(elmSelecter)[0].height)/2;
                        }catch(e){}
                    }
                }

                console.log('new moveTop', moveTop);
                 
                // console.log('articleLeftA', $(".articleLeftA")[0].style.overflowY);
                // $(".articleLeftA")[0].style.overflow = "scroll";               
                // console.log('articleLeftA', $(".articleLeftA")[0].style.overflowY);
                
                // 화면 이동 0.4초(400)
                // console.log("articleStop", $(".articleLeftA").stop())
                $("html, body").stop().animate({
                    scrollTop: moveTop + 'px'
                }, {
                    duration: 400, complete: function () {
                    }
                });

                // $(".articleLeftA")[0].style.overflow = "hidden";
                // console.log('articleLeftA', $(".articleLeftA")[0].style.overflowY);

            });
        });
    };

    render(){
        // 넘겨받은 Article들을 props에 넣어주기
        this.newsContents = this.props.location.state;
        const newsArr = this.newsContents.newsContents;
        
        // props에 있는 데이터를 body에 show.
        var contents = [];
        var i = 0
        while(i < this.newsContents.newsContents.length){
            contents.push(<img key={i} alt={newsArr[i].a_title} className="articleImageA" src={newsArr[i].img}></img>);
            i = i + 1;
        }

        var ArticleRightComp = [];
        ArticleRightComp.push(<ArticleRight Articles={this.newsContents} index={this.state.focusIndex}></ArticleRight>)

        console.log('ArticleFrame에서 index', this.state.focusIndex)

        return (
            <div className="articleDivA" style={{position:'relative', display:'inline-block', /*overflow:'hidden',*/ width: "calc(100% - 100px)", left : "100px"}}>
                {/* <div style={{textAlign: 'center', position: 'relative', display: 'inline-block', overflow: 'hidden', float: 'left', width: '100%'}}> */}
                    <div className="articleLeftA" onWheel={this.onScroll} /*onScroll={this.onScroll}*/
                    style={{backgroundColor:'white', display:'inline-block', width:'45%', height:'300px', minWidth:"400px", maxWidth:"600px", textAlign:"center"}}>
                        <img alt="startLogo" className="articleImageA" src="/img/logo.png" style={{height:"windowHeightSize", minHeight:"50px"}}></img>
                        {contents}
                        <img alt="endLogo" className="articleImageA" src="/img/logo.png" style={{height:"windowHeightSize", minHeight:"50px"}}></img>
                    </div>
                    {/* <ArticleRight Articles={this.newsContents} index={this.state.focusIndex}></ArticleRight> */}
                    {ArticleRightComp}
            </div>
        );
    }
}

export default ArticleFrame;
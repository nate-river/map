$(function(){
    //鼠标放到人头上名字消失
    $('.circle-wrapper').delegate('a','mouseover',function(){
        $(this).parent().find('span').css('top','140px');
    });
    $('.circle-wrapper').delegate('a','mouseout',function(){
        $(this).parent().find('span').css('top','80px');
    });
    $('.circle-wrapper').delegate('span','mouseover',function(){
        $(this).css('top','140px');
    });
    $('.circle-wrapper').delegate('a','click',function(e){
        e.stopPropagation();
    })


    var
    //用来记录弹出的头像的位置，为了实现动画原路返回
    positions = [],
    colors = ['gray','purple','orange','coffee','yellow','green','blue','red'],
    //在鼠标点击的位置创建一个小头像，pianyi这个变量是为了使以点击点为圆心创建div
    //因为circel-out这个div上有上下左右27的margin值 
    pianyi = ($(".circle-out").outerWidth() + parseInt($('.circle-out').css('margin'))*2)/2,
    _per = pianyi*2,
    //per变量用来控制div换行,第一行放下4个之后换行
    per = [0,_per,_per*2,_per*3],
    j = 0;

    //根据数据给地图上的区域添加id
    for ( var i in database ){
        $( $('.link')[j] ).attr('id',i);
        j++;
    }
 
    $('.link').click(function(e){
        e.stopPropagation();

        //清空上一次点击创建的内容
        $('.inner').empty();
        $('.circle-wrapper').show();
        positions = [];

        //给当前点的州添加一个透明的遮罩
        $('.link').css('opacity','0');
        $(this).css('opacity','0.3');
        
        var
        top = 0, j = 0, that = this,
        peopleInfo = database[$(this).attr('id')];

        for ( var name in peopleInfo ){
            var
            el = $('<div/>').html('<img onerror="javascript:this.src=\'./pic/1.jpg\'" src="./pic/'+name+'.jpg"/><em></em><a href="http://zh.wikipedia.org/wiki/'+name+'" target="_blank"></a><span>'+name+'</span>').addClass('circle circle-inner'),
            pos = $(that).position(),
            $circle = $('<div/>').html(el).appendTo($('.inner')).addClass('circle circle-out'),
            _left = e.offsetX + pos.left - pianyi + 'px' ,
            _top = e.offsetY + pos.top - pianyi + 'px' ;

            $circle.css({
                position:'absolute',
                left: _left,
                top: _top,
                webkitTransform:'scale(0.1,0.1)',
                webkitTransition:'-webkit-transform 2s ease'
            });
            positions.push({left:_left,top:_top});

            if(j%4 == 0)
                top += _per;
            $circle.animate({
                left: per[j%4] + 'px',
                top:  top - 100 + 'px',
                webkitTransform:'scale(1,1)'
            },800),
            $('.circle-inner a:last').addClass(colors[j%8]);
            j++;
        }
    })
    $(document).click(function(){
        $('.link').css('opacity','0');
        for ( var i = 0;  i < $('.circle-out').length;  i++){
            $($('.circle-out')[i]).css({
                webkitTransition:'-webkit-transform 1s ease',
                webkitTransform:'scale(0.1,0.1)'
            });

            $($('.circle-out')[i]).animate({
                left: positions[i].left,
                top: positions[i].top,
            },1000)
        }
        setTimeout(function(){
            $('.circle-wrapper').hide();
        },1000)
    })
});
// var $map = $('.map').offset();
// $(document).mousedown(function(e){
//     $('<div/>').css({
//         left:e.offsetX + 'px',
//         top:e.offsetY + 'px'
//     }).html('').appendTo($('.map')).addClass('link');
//     var E = e;
//     $(document).mousemove(function(e){
//         $('.map div:last').css({
//             width:e.pageX - E.offsetX - $map.left + 'px',
//             height:e.pageY - E.offsetY -$map.top + 'px'
//         })
//     })
//     $(document).mouseup(function(){
//         $(document).unbind('mouseup');
//         $(document).unbind('mousemove');
//     })
// });

// $(".link").mousedown(function(e){
//     e.stopPropagation();
//     var that = this;
//     var E = e;
//     $(document).mousemove(function(ev){
//         $(that).css({
//             left: ev.pageX - E.offsetX - $('.map').offset().left + 'px',
//             top: ev.pageY - E.offsetY - $('.map').offset().top + 'px'
//         }); 
//     });
//     $(document).mouseup(function(e){
//         e.stopPropagation();
//         $(document).unbind('mousemove');
//         $(document).unbind('mouseup');
//     })
// });

//wikiapi
// var url = 'http://en.wikipedia.org/w/api.php?format=json&action=query&titles=李白&prop=revisions&rvprop=content';
// $.ajax({
//     url:url,
//     type:'post',
//     success:function(data){
//         console.log(data);
//     }
// });
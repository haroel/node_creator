/**
 * ihowe@outlook.com
 * author by haroel
 * Created by howe on 2017/3/22.
 */
/*
 *
 * 缓动定义文件, 可以扩展该文件以获得更多的缓动类型算法
 *
 * 目前只提供了 EaseElasticIn  EaseElasticOut backEaseOut
 *
 * HAction默认的缓动只能处理单个参数的缓动
 * 如果要处理多参数缓动(比如bezier动画传入控制点参数),
 * 请在继承HActionInterval之后的update函数里计算处理, 不要调用this._super(dt);
 *
 * */

var ease = {};
module.exports = ease;

let M_PI_X_2 = 3.1415926535 * 2;

ease.EaseElasticIn = function ( value )
{
    let period = value || 0.3;
    return function ( time )
    {
        let newT = 0;
        if (time == 0 || time == 1)
        {
            newT = time;
        }
        else
        {
            let s = period / 4;
            time = time - 1;
            newT = -Math.pow(2, 10 * time) * Math.sin((time - s) * M_PI_X_2 / period);
        }
        return newT;
    }
};

ease.EaseElasticOut = function ( value )
{
    let period = value || 0.3;
    return function ( time )
    {
        let newT = 0;
        if (time == 0 || time == 1)
        {
            newT = time;
        }
        else
        {
            let s = period / 4;
            newT = Math.pow(2, -10 * time) * Math.sin((time - s) * M_PI_X_2 / period) + 1;
        }

        return newT;
    }
};
ease.backEaseOut= function (  )
{
    return function ( time )
    {
        let overshoot = 1.70158;

        time = time - 1;
        return time * time * ((overshoot + 1) * time + overshoot) + 1;
    }
};

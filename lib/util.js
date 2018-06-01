/**
 * Created by Kzhang on 2018/5/31.
 */
module.exports = (() => {
    return {
        paramsIsvalid(){
            for (let key in arguments) {
                if (!arguments[key]) return false;
            }
            return true
        },
        creatCodeObj(code,data){
            return{
                code,
                data
            }
        }
    }
})();
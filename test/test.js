var prefix = require('..'),
    expect = require('expect.js'),
    dash = prefix.dash;

describe('prefix', function(){
    it ('should not prefix things which don\'t need prefixes', function(){
        expect(prefix('border') == 'border').to.be.ok();
    });

    it('should format dashed properties', function(){
        expect(prefix('background-color') == 'backgroundColor').to.be.ok();
        expect(prefix('background-color') == 'backgroundColor').to.be.ok();
    });

    it ('may return a prefixed dom style for css3 style like transform', function(){
        expect(prefix('transform') in possibilities('transform')).to.be.ok();
    });

    it('should memoize results', function(){
        expect(prefix('border') == 'border').to.be.ok();
        expect(prefix('border') == 'border').to.be.ok();
        expect(prefix('transform') in possibilities('transform')).to.be.ok();
        expect(prefix('transform') in possibilities('transform')).to.be.ok();
    });

    it ('should throw if it can\'t find a correct key', function(){
        expect(function () {
            prefix('something fucked up')
        }).to.throwError();
    });
});

describe('dash', function(){
    it('should create a dasherized string', function(){
        expect(dash('transform') in {
            '-webkit-transform': null,
            '-moz-transform': null,
            '-ms-transform': null,
            '-o-transform': null,
            'transform': null
        }).to.be.ok();
    });

    it('should return the given string when property is not prefixed', function(){
        expect(dash('background-color') == 'background-color').to.be.ok();
        expect(dash('background-color') == 'background-color').to.be.ok();
        expect(dash('border-radius') == 'border-radius').to.be.ok();
        expect(dash('color') == 'color').to.be.ok();
        expect(dash('height') == 'height').to.be.ok();
    });
});

function possibilities(key){
    return 'Moz O ms webkit'.split(' ').map(function(pre){
        return pre + capitalize(key)
    }).concat(key).reduce(function(o, k){
        o[k] = true;
        return o;
    }, {});
};

function capitalize(str){
    return str.charAt(0).toUpperCase() + str.slice(1);
};

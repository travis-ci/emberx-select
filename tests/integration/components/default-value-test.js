/* jshint expr:true */
import { expect } from 'chai';
import { describeComponent, it } from 'ember-mocha';
import { describe, beforeEach } from 'mocha';
import hbs from 'htmlbars-inline-precompile';

describeComponent(
  'default-value',
  'Integration: DefaultValue',
  {
    integration: true
  },
  function() {
    describe("default value of null", function() {
      beforeEach(function() {
        this.set('make', null);
        this.set('selectAction', (value) => {
          this.set("make", value);
          this.set("wasCalled", true);
        });

        this.render(hbs`
          {{#x-select value=make action=selectAction as |xs|}}
            {{#xs.option value="fordValue" class="spec-ford-option"}}Ford{{/xs.option}}
            {{#xs.option value="chevyValue"}}Chevy{{/xs.option}}
            {{#xs.option value="dodgeValue" class="spec-dodge-option"}}Dodge{{/xs.option}}
          {{/x-select}}
        `);
      });

      it("displays the first item in the list", function() {
        expect(this.$('select option:selected').text()).to.equal("Ford");
      });

      it("sets the default value to the first element", function() {
        expect(this.get('make')).to.equal("fordValue");
      });

      it("invokes the select action on init", function() {
        expect(this.get("wasCalled")).to.equal(true);
      });

    });
  }
);

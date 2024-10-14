/**
 * Copyright 2024 Pbauer34
 * @license Apache-2.0, see LICENSE for full text.
 */
import { LitElement, html, css } from "lit";
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";
import { I18NMixin } from "@haxtheweb/i18n-manager/lib/I18NMixin.js";

const goalData = [
  { name: 'No Poverty', color: '#e5243b' },
  { name: 'Zero Hunger', color: '#dda63a' },
  { name: 'Good Health and Well-being', color: '#4c9f38' },
  { name: 'Quality Education', color: '#c5192d' },
  { name: 'Gender Equality', color: '#ff3a21' },
  { name: 'Clean Water and Sanitation', color: '#26bde2' },
  { name: 'Affordable and Clean Energy', color: '#fcc30b' },
  { name: 'Decent Work and Economic Growth', color: '#a21942' },
  { name: 'Industry, Innovation and Infrastructure', color: '#fd6925' },
  { name: 'Reduced Inequalities', color: '#dd1367' },
  { name: 'Sustainable Cities and Communities', color: '#fd9d24' },
  { name: 'Responsible Consumption and Production', color: '#bf8b2e' },
  { name: 'Climate Action', color: '#3f7e44' },
  { name: 'Life Below Water', color: '#0a97d9' },
  { name: 'Life on Land', color: '#56c02b' },
  { name: 'Peace, Justice and Strong Institutions', color: '#00689d' },
  { name: 'Partnerships for the Goals', color: '#19486a' },
];

/**
 * `un-sdg`
 * 
 * @demo index.html
 * @element un-sdg
 */
export class unSdg extends DDDSuper(I18NMixin(LitElement)) {

  static get tag() {
    return "un-sdg";
  }

  constructor() {
    super();
    this.title = "";
    this.goal = "1";
    this.label = '';
    this.colorOnly = false;
    this._currentSource = '';
    this.alt='';
    this.t = this.t || {};
    this.t = {
      ...this.t,
      title: "Title",
    };
    this.registerLocalization({
      context: this,
      localesPath:
        new URL("./locales/un-sdg.ar.json", import.meta.url).href +
        "/../",
      locales: ["ar", "es", "hi", "zh"],
    });
  }

  // Lit reactive properties
  static get properties() {
    return {
      ...super.properties,
      title: { type: String },
      goal: {type: String,  reflect: true },
      label: {type: String },
      colorOnly: {type: Boolean, reflect: true},
      _currentSource: { type: String },
      alt: { type: String }
    };
  }

  // goal data is updated based on the current goal
  updateGoalData(){
  const goalNum = parseInt(this.goal, 10); //turns the number in the filename into an integer

  //cases based on if the goal is not a numerical goal
  if(this.goal === 'all' || this.goal ==='circle'){
    this._currentSource = new URL(`../lib/svgs/${this.goal}.svg`, import.meta.url).href;
    this.alt = this.goal === 'all' ? 'All Sustainable Development Goals' : 'Sustainable Development Goals Circle';
    return;
  }

  // cases based on the numerical goals
  if (goalNum >=1 && goalNum <= 17){
    this._currentSource = new URL(`../lib/svgs/goal-${goalNum}.svg`, import.meta.url).href;
    this.alt = `Goal ${goalNum}: ${goalData[goalNum - 1].name}`;
  }


}

//used when the properties are changed
updated(changedProperties) {
  if (changedProperties.has('goal')) {
    this.updateGoalData();
  }
}

  // Lit scoped styles
  static get styles() {
    return [super.styles,
    css`
      :host {
        display: inline-block;
        color: var(--ddd-theme-primary);
        background-color: var(--ddd-theme-accent);
        font-family: var(--ddd-font-navigation);
        width: 254px;
        height: 254px;
      }
      .wrapper {
        margin: var(--ddd-spacing-2);
        padding: var(--ddd-spacing-4);
      }
      h3 span {
        font-size: var(--un-sdg-label-font-size, var(--ddd-font-size-s));
      }
      img {
        width: 100%;
        height: 100%;
        object-fit: contain;
      }

      .color-only {
        width: 100%;
        height: 100%;
      }
    `];
  }

  // Lit render the HTML
  render() {
    const goalNum = parseInt(this.goal, 10); //turns the number in the filename into an integer

    // displays the color if color only is true
    if(this.colorOnly && goalNum >= 1 && goalNum <= 17){
      return html` <div class="color-only" style="background-color: ${goalData[goalNum -1].color};"></div>`
    }
    else{ //else display the image of the goal

      return html`
    <img 
    src="${this._currentSource}"
    alt="${this.label || this.alt}"
    loading="lazy"
    fetchpriority="low"
    />
    `;
    }
    
  
  }

  /**
   * haxProperties integration via file reference
   */
  static get haxProperties() {
    return new URL(`./lib/${this.tag}.haxProperties.json`, import.meta.url).href;
  }
}

globalThis.customElements.define(unSdg.tag, unSdg);
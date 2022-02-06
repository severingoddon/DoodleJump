
export class DoodlePlatform {
    left: number;
    bottom: number;
    visualElement: HTMLDivElement;
    constructor(newPlatBottom) {
        this.left = Math.random() * 315
        this.bottom = newPlatBottom
        this.visualElement = document.createElement('div')
        const visualElement = this.visualElement
        visualElement.classList.add('platform')
        visualElement.style.left = this.left + 'px'
        visualElement.style.bottom = this.bottom + 'px'
        return this
    }
}

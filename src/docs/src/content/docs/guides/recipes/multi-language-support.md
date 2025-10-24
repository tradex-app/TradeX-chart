---
title: Multi-Language Support
description: Add internationalization to your chart
---

# Multi-Language Support

Implement multi-language support (i18n) for your chart application.

## Basic i18n

```javascript
const translations = {
  en: {
    chart: {
      title: 'Price Chart',
      zoom: 'Zoom',
      reset: 'Reset',
      export: 'Export',
      timeframes: {
        '1m': '1 Minute',
        '5m': '5 Minutes',
        '1h': '1 Hour',
        '1d': '1 Day'
      }
    }
  },
  es: {
    chart: {
      title: 'Gráfico de Precios',
      zoom: 'Ampliar',
      reset: 'Restablecer',
      export: 'Exportar',
      timeframes: {
        '1m': '1 Minuto',
        '5m': '5 Minutos',
        '1h': '1 Hora',
        '1d': '1 Día'
      }
    }
  },
  fr: {
    chart: {
      title: 'Graphique des Prix',
      zoom: 'Zoomer',
      reset: 'Réinitialiser',
      export: 'Exporter',
      timeframes: {
        '1m': '1 Minute',
        '5m': '5 Minutes',
        '1h': '1 Heure',
        '1d': '1 Jour'
      }
    }
  }
}

function t(key, lang = 'en') {
  const keys = key.split('.')
  let value = translations[lang]
  
  for (const k of keys) {
    value = value?.[k]
  }
  
  return value || key
}

// Usage
console.log(t('chart.title', 'es')) // "Gráfico de Precios"
```

## i18n Manager

```javascript
class I18nManager {
  constructor(defaultLocale = 'en') {
    this.locale = defaultLocale
    this.translations = {}
    this.fallbackLocale = 'en'
  }

  addTranslations(locale, translations) {
    this.translations[locale] = {
      ...this.translations[locale],
      ...translations
    }
  }

  setLocale(locale) {
    if (this.translations[locale]) {
      this.locale = locale
      this.emit('localeChanged', locale)
    }
  }

  t(key, params = {}) {
    let value = this.getValue(key, this.locale)
    
    if (!value && this.locale !== this.fallbackLocale) {
      value = this.getValue(key, this.fallbackLocale)
    }
    
    if (!value) return key
    
    // Replace parameters
    return value.replace(/\{(\w+)\}/g, (match, param) => {
      return params[param] !== undefined ? params[param] : match
    })
  }

  getValue(key, locale) {
    const keys = key.split('.')
    let value = this.translations[locale]
    
    for (const k of keys) {
      value = value?.[k]
    }
    
    return value
  }

  getAvailableLocales() {
    return Object.keys(this.translations)
  }
}

// Usage
const i18n = new I18nManager('en')

i18n.addTranslations('en', {
  chart: {
    welcome: 'Welcome, {name}!',
    candles: '{count} candles loaded'
  }
})

i18n.addTranslations('es', {
  chart: {
    welcome: '¡Bienvenido, {name}!',
    candles: '{count} velas cargadas'
  }
})

console.log(i18n.t('chart.welcome', { name: 'John' })) // "Welcome, John!"
i18n.setLocale('es')
console.log(i18n.t('chart.welcome', { name: 'Juan' })) // "¡Bienvenido, Juan!"
```

## Chart with i18n

```javascript
class LocalizedChart {
  constructor(element, i18n) {
    this.chart = element
    this.i18n = i18n
    this.setupUI()
    
    i18n.on('localeChanged', () => this.updateUI())
  }

  setupUI() {
    this.chart.setConfig({
      title: this.i18n.t('chart.title'),
      xAxis: {
        label: this.i18n.t('chart.time')
      },
      yAxis: {
        label: this.i18n.t('chart.price')
      }
    })
  }

  updateUI() {
    this.setupUI()
    this.updateButtons()
    this.updateTooltips()
  }

  updateButtons() {
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n')
      el.textContent = this.i18n.t(key)
    })
  }
}
```

## Language Selector

```html
<div class="language-selector">
  <select id="languageSelect">
    <option value="en">English</option>
    <option value="es">Español</option>
    <option value="fr">Français</option>
    <option value="de">Deutsch</option>
    <option value="ja">日本語</option>
  </select>
</div>

<script>
  document.getElementById('languageSelect').addEventListener('change', (e) => {
    i18n.setLocale(e.target.value)
  })
</script>
```

## Date/Number Formatting

```javascript
class LocaleFormatter {
  constructor(locale) {
    this.locale = locale
  }

  formatDate(timestamp, options = {}) {
    return new Intl.DateTimeFormat(this.locale, options).format(timestamp)
  }

  formatNumber(number, options = {}) {
    return new Intl.NumberFormat(this.locale, options).format(number)
  }

  formatCurrency(amount, currency = 'USD') {
    return new Intl.NumberFormat(this.locale, {
      style: 'currency',
      currency
    }).format(amount)
  }
}

// Usage
const formatter = new LocaleFormatter('en-US')
console.log(formatter.formatDate(Date.now())) // "12/31/2023"
console.log(formatter.formatNumber(1234567.89)) // "1,234,567.89"
console.log(formatter.formatCurrency(1234.56)) // "$1,234.56"

const formatterES = new LocaleFormatter('es-ES')
console.log(formatterES.formatDate(Date.now())) // "31/12/2023"
console.log(formatterES.formatNumber(1234567.89)) // "1.234.567,89"
console.log(formatterES.formatCurrency(1234.56, 'EUR')) // "1.234,56 €"
```

## Related Documentation

- [Accessibility](../accessibility) - Accessibility guide
- [Configuration](../../reference/02_configuration) - Chart configuration
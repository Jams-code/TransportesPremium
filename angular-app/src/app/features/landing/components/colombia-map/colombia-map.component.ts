import { Component, ElementRef, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { COLOMBIA_DEPARTMENTS } from '../../../../core/data/colombia-departments';

interface CityMarker {
  name: string;
  zone: string;
  dept: string;
  x: number;
  y: number;
}

interface DeptView {
  name: string;
  label: string;
  d: string;
}

const LON_MIN = -79.2;
const LON_MAX = -66.8;
const LAT_MIN = -4.4;
const LAT_MAX = 12.6;
const SCALE = 100;

const CITY_COORDS: Record<string, [number, number]> = {
  'Bogotá': [-74.07, 4.71],
  'Medellín': [-75.57, 6.24],
  'Manizales': [-75.52, 5.07],
  'Pereira': [-75.7, 4.81],
  'Armenia': [-75.68, 4.53],
  'Cartagena': [-75.48, 10.39],
  'Barranquilla': [-74.78, 10.97],
  'Santa Marta': [-74.2, 11.24],
  'Riohacha': [-72.91, 11.54],
  'Buenaventura': [-77.03, 3.88],
  'Cali': [-76.53, 3.45],
  'Tunja': [-73.37, 5.54],
  'Facatativá': [-74.35, 4.81],
  'Zipaquirá': [-74.0, 5.02],
  'Villavicencio': [-73.63, 4.14],
  'Montería': [-75.88, 8.75],
  'Cúcuta': [-72.51, 7.89],
  'Valledupar': [-73.24, 10.47]
};

const CITY_DEPTS: Record<string, string> = {
  'Bogotá': 'SANTAFE DE BOGOTA D.C',
  'Medellín': 'ANTIOQUIA',
  'Manizales': 'CALDAS',
  'Pereira': 'RISARALDA',
  'Armenia': 'QUINDIO',
  'Cartagena': 'BOLIVAR',
  'Barranquilla': 'ATLANTICO',
  'Santa Marta': 'MAGDALENA',
  'Riohacha': 'LA GUAJIRA',
  'Buenaventura': 'VALLE DEL CAUCA',
  'Cali': 'VALLE DEL CAUCA',
  'Tunja': 'BOYACA',
  'Facatativá': 'CUNDINAMARCA',
  'Zipaquirá': 'CUNDINAMARCA',
  'Villavicencio': 'META',
  'Montería': 'CORDOBA',
  'Cúcuta': 'NORTE DE SANTANDER',
  'Valledupar': 'CESAR'
};

const DEPT_LABELS: Record<string, string> = {
  'SANTAFE DE BOGOTA D.C': 'Bogotá D.C.'
};

@Component({
  selector: 'app-colombia-map',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="map-wrap" #wrap>
      <svg class="colombia-svg" viewBox="0 0 1240 1700" preserveAspectRatio="xMidYMid meet" (mousemove)="onMove($event)">
        <g class="dept-layer">
          <path *ngFor="let d of depts" [attr.d]="d.d"
            class="dept-path"
            [class.hover]="hoverDept === d.name"
            [class.selected]="selectedDept === d.name"
            (mouseenter)="onDeptEnter(d.name, $event)"
            (mouseleave)="onLeave()"
            (click)="onDeptClick(d.name)"></path>
        </g>
        <g class="route-layer" aria-hidden="true">
          <path *ngFor="let route of routes" class="route-line" [attr.d]="route"></path>
        </g>
        <g class="marker-layer">
          <g *ngFor="let m of markers" class="marker-group"
            [class.active]="selectedCity === m.name || selectedDept === m.dept"
            [attr.transform]="'translate(' + m.x + ',' + m.y + ')'"
            (mouseenter)="onCityEnter(m, $event)"
            (mouseleave)="onLeave()"
            (click)="onCityClick(m)">
            <circle class="marker-halo" r="24"></circle>
            <circle class="marker-dot" r="10"></circle>
            <rect class="city-badge" x="15" y="-17" [attr.width]="badgeWidth(m.name)" height="26" rx="13"></rect>
            <text class="city-label" x="15" y="5">{{ m.name }}</text>
          </g>
        </g>
      </svg>
      <div class="map-tooltip" *ngIf="tooltip" [style.left.px]="tooltip.x" [style.top.px]="tooltip.y">
        {{ tooltip.text }}
      </div>
      <div class="map-info">
        <div class="map-info-title">{{ infoTitle }}</div>
        <div class="map-info-sub">{{ infoSub }}</div>
        <div class="map-info-cities" *ngIf="infoCities.length">
          <span class="info-city" *ngFor="let c of infoCities">{{ c }}</span>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .map-wrap {
      position: relative;
      width: 100%;
      height: 100%;
    }

    .colombia-svg {
      width: 100%;
      height: 100%;
      display: block;
    }

    .dept-path {
      fill: rgba(100, 166, 245, 0.18);
      stroke: rgba(43, 126, 228, 0.45);
      stroke-width: 1.1;
      transition: fill 0.3s ease, filter 0.3s ease;
      cursor: pointer;
    }

    .dept-path.hover {
      fill: rgba(0, 212, 255, 0.32);
      filter: drop-shadow(0 0 6px rgba(0, 212, 255, 0.55));
    }

    .dept-path.selected {
      fill: rgba(0, 102, 255, 0.48);
      stroke: rgba(0, 212, 255, 0.9);
      stroke-width: 1.6;
      filter: drop-shadow(0 0 8px rgba(0, 212, 255, 0.4));
    }

    .marker-group {
      cursor: pointer;
    }

    .marker-dot {
      fill: #0879e8;
      stroke: #ffffff;
      stroke-width: 2;
      transition: fill 0.3s ease, filter 0.3s ease;
    }

    .marker-halo {
      fill: rgba(8, 121, 232, 0.25);
      transform-box: fill-box;
      transform-origin: center;
      animation: markerPulse 2.2s ease-out infinite;
    }

    .marker-group:hover .marker-dot {
      filter: drop-shadow(0 0 6px rgba(0, 212, 255, 0.9));
    }

    .marker-group:hover .marker-halo {
      animation-duration: 1.2s;
    }

    .marker-group.active .marker-dot {
      fill: #00e5ff;
      filter: drop-shadow(0 0 5px rgba(0, 212, 255, 0.8));
    }

    .marker-group.active .marker-halo {
      animation-duration: 1.4s;
      fill: rgba(0, 212, 255, 0.5);
    }

    .city-badge {
      fill: rgba(255, 255, 255, 0.92);
      stroke: rgba(8, 121, 232, 0.18);
      stroke-width: 1;
      transition: fill 0.3s ease, stroke 0.3s ease;
      pointer-events: none;
    }

    .city-label {
      font-size: 20px;
      font-weight: 600;
      font-family: 'Space Grotesk', sans-serif;
      fill: #173660;
      transition: fill 0.3s ease;
      pointer-events: none;
      user-select: none;
    }

    .marker-group:hover .city-badge {
      fill: rgba(10, 12, 40, 0.8);
      stroke: rgba(0, 212, 255, 0.5);
    }

    .marker-group:hover .city-label {
      fill: #0879e8;
    }

    .marker-group.active .city-badge {
      fill: rgba(0, 102, 255, 0.4);
      stroke: rgba(0, 212, 255, 0.6);
    }

    .marker-group.active .city-label {
      fill: #0879e8;
    }

    .route-line {
      fill: none;
      stroke: rgba(8, 121, 232, 0.42);
      stroke-width: 2.2;
      stroke-dasharray: 7 9;
      animation: routeFlow 5s linear infinite;
      pointer-events: none;
    }

    @keyframes routeFlow { to { stroke-dashoffset: -32; } }

    @keyframes markerPulse {
      0% { transform: scale(0.55); opacity: 0.85; }
      100% { transform: scale(1.9); opacity: 0; }
    }

    .map-tooltip {
      position: absolute;
      transform: translate(-50%, calc(-100% - 12px));
      padding: 0.45rem 0.85rem;
      background: rgba(10, 12, 40, 0.92);
      border: 1px solid rgba(0, 212, 255, 0.35);
      border-radius: 8px;
      color: #fff;
      font-size: 0.8rem;
      font-weight: 600;
      white-space: nowrap;
      pointer-events: none;
      z-index: 5;
      box-shadow: 0 4px 16px rgba(0, 0, 0, 0.35);
    }

    .map-info {
      position: absolute;
      left: 0.9rem;
      right: 0.9rem;
      bottom: 0.9rem;
      padding: 0.85rem 1rem;
      background: var(--theme-surface-raised);
      border: 1px solid var(--theme-border);
      border-radius: 12px;
      backdrop-filter: blur(8px);
      transition: all 0.3s ease;
    }

    .map-info-title {
      font-family: 'Space Grotesk', sans-serif;
      font-size: 0.95rem;
      font-weight: 700;
       color: var(--theme-accent);
      margin-bottom: 0.2rem;
    }

    .map-info-sub {
      font-size: 0.78rem;
      color: var(--theme-text-secondary);
      line-height: 1.5;
    }

    .map-info-cities {
      display: flex;
      flex-wrap: wrap;
      gap: 0.4rem;
      margin-top: 0.6rem;
    }

    .info-city {
      font-size: 0.72rem;
      font-weight: 600;
      padding: 0.25rem 0.6rem;
      background: #e7f2ff;
      border: 1px solid #c9e1fb;
      border-radius: 100px;
      color: #0879e8;
    }

    @media (min-width: 768px) {
      .map-info {
        left: 1.1rem;
        right: 1.1rem;
        bottom: 1.1rem;
      }
    }
  `]
})
export class ColombiaMapComponent {
  @Input() regions: { region: string; cities: string[] }[] = [];

  depts: DeptView[] = [];
  markers: CityMarker[] = [];

  hoverDept: string | null = null;
  selectedDept: string | null = null;
  selectedCity: string | null = null;

  tooltip: { x: number; y: number; text: string } | null = null;

  infoTitle = 'Cobertura Nacional';
  infoSub = '';
  infoCities: string[] = [];
  routes: string[] = [];

  constructor(private el: ElementRef) {}

  ngOnInit() {
    this.buildDepts();
    this.buildMarkers();
    this.buildRoutes();
    this.resetInfo();
  }

  private proj(lon: number, lat: number): [number, number] {
    return [(lon - LON_MIN) * SCALE, (LAT_MAX - lat) * SCALE];
  }

  private buildDepts() {
    this.depts = COLOMBIA_DEPARTMENTS.map(dept => ({
      name: dept.name,
      label: this.deptLabel(dept.name),
      d: this.buildPathD(dept.polygons)
    }));
  }

  private buildPathD(polygons: number[][][][]): string {
    let d = '';
    for (const poly of polygons) {
      for (const ring of poly) {
        for (let i = 0; i < ring.length; i++) {
          const [x, y] = this.proj(ring[i][0], ring[i][1]);
          d += (i === 0 ? 'M' : 'L') + x.toFixed(1) + ' ' + y.toFixed(1);
        }
        d += 'Z';
      }
    }
    return d;
  }

  private buildMarkers() {
    const seen = new Set<string>();
    for (const region of this.regions) {
      for (const city of region.cities) {
        if (seen.has(city)) continue;
        seen.add(city);
        const coords = CITY_COORDS[city];
        if (!coords) continue;
        const [x, y] = this.proj(coords[0], coords[1]);
        this.markers.push({
          name: city,
          zone: region.region,
          dept: CITY_DEPTS[city] || '',
          x: Math.round(x),
          y: Math.round(y)
        });
      }
    }
  }

  private buildRoutes() {
    const origin = this.proj(...CITY_COORDS['Bogotá']);
    const destinations = ['Medellín', 'Cali', 'Cartagena', 'Barranquilla', 'Cúcuta', 'Villavicencio', 'Santa Marta', 'Armenia', 'Pereira', 'Manizales'];
    this.routes = destinations.map((city, index) => {
      const target = this.proj(...CITY_COORDS[city]);
      const bend = (index % 2 === 0 ? 1 : -1) * (18 + index * 2);
      const controlX = (origin[0] + target[0]) / 2 + bend;
      const controlY = (origin[1] + target[1]) / 2 - bend;
      return `M ${origin[0].toFixed(1)} ${origin[1].toFixed(1)} Q ${controlX.toFixed(1)} ${controlY.toFixed(1)} ${target[0].toFixed(1)} ${target[1].toFixed(1)}`;
    });
  }

  private deptLabel(name: string): string {
    if (DEPT_LABELS[name]) return DEPT_LABELS[name];
    const smallWords = new Set(['DE', 'DEL', 'LA', 'EL', 'LOS', 'Y']);
    return name.split(' ').map(w => {
      if (smallWords.has(w)) return w.toLowerCase();
      return w.charAt(0) + w.slice(1).toLowerCase();
    }).join(' ');
  }

  badgeWidth(name: string): number {
    return name.length * 11.5 + 18;
  }

  private resetInfo() {
    this.infoTitle = 'Cobertura Nacional';
    this.infoSub = this.markers.length + ' ciudades con cobertura de transporte en todo el país';
    this.infoCities = [];
  }

  onDeptEnter(name: string, event: MouseEvent) {
    this.hoverDept = name;
    this.showTooltip(this.deptLabel(name), event);
  }

  onCityEnter(marker: CityMarker, event: MouseEvent) {
    this.showTooltip(marker.name, event);
  }

  onLeave() {
    this.hoverDept = null;
    this.tooltip = null;
  }

  onMove(event: MouseEvent) {
    if (this.tooltip) {
      const rect = (event.target as Element).closest('.map-wrap')!.getBoundingClientRect();
      this.tooltip = {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top,
        text: this.tooltip.text
      };
    }
  }

  private showTooltip(text: string, event: MouseEvent) {
    const rect = this.el.nativeElement.querySelector('.map-wrap').getBoundingClientRect();
    this.tooltip = {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
      text
    };
  }

  onDeptClick(name: string) {
    this.selectedDept = this.selectedDept === name ? null : name;
    this.selectedCity = null;
    if (!this.selectedDept) {
      this.resetInfo();
      return;
    }
    const label = this.deptLabel(name);
    const cities = this.markers.filter(m => m.dept === name);
    if (cities.length) {
      this.infoTitle = label;
      this.infoSub = 'Ciudades con cobertura en ' + cities[0].zone;
      this.infoCities = cities.map(c => c.name);
    } else {
      this.infoTitle = label;
      this.infoSub = 'Servicio de transporte disponible en todo el departamento';
      this.infoCities = [];
    }
  }

  onCityClick(marker: CityMarker) {
    this.selectedCity = this.selectedCity === marker.name ? null : marker.name;
    this.selectedDept = null;
    if (!this.selectedCity) {
      this.resetInfo();
      return;
    }
    this.infoTitle = marker.name;
    this.infoSub = marker.zone;
    this.infoCities = this.markers.filter(m => m.zone === marker.zone).map(m => m.name);
  }
}

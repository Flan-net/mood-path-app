import { useMemo, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Layout from "@/components/Layout";
import ClearDataButton from "@/components/ClearDataButton";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getEntriesLastWeek, getEntriesLast30Days, getEntriesLastYear } from "@/utils/storage";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { TrendingUp, Calendar, Activity, ArrowUp, ArrowDown, Minus, Moon, AlertTriangle, Info } from "lucide-react";
import { DailyEntry } from "@/types/wellness";

const Dashboard = () => {
  const navigate = useNavigate();
  const [period, setPeriod] = useState<"week" | "month" | "year">("month");
  
  const entries = useMemo(() => {
    switch (period) {
      case "week":
        return getEntriesLastWeek();
      case "month":
        return getEntriesLast30Days();
      case "year":
        return getEntriesLastYear();
      default:
        return getEntriesLast30Days();
    }
  }, [period]);

  const chartData = useMemo(() => {
    return entries.map(entry => ({
      date: new Date(entry.date).toLocaleDateString('es-ES', { month: 'short', day: 'numeric' }),
      'Estado de Ánimo': entry.mood,
      'Energía': entry.energy,
      'Sueño': entry.sleep,
      'Estrés': entry.stress,
    }));
  }, [entries]);

  const averages = useMemo(() => {
    if (entries.length === 0) return { mood: 0, energy: 0, sleep: 0, stress: 0 };
    
    const sum = entries.reduce((acc, entry) => ({
      mood: acc.mood + entry.mood,
      energy: acc.energy + entry.energy,
      sleep: acc.sleep + entry.sleep,
      stress: acc.stress + entry.stress,
    }), { mood: 0, energy: 0, sleep: 0, stress: 0 });

    return {
      mood: (sum.mood / entries.length).toFixed(1),
      energy: (sum.energy / entries.length).toFixed(1),
      sleep: (sum.sleep / entries.length).toFixed(1),
      stress: (sum.stress / entries.length).toFixed(1),
    };
  }, [entries]);

  const exerciseCount = useMemo(() => {
    return entries.filter(e => e.exercise).length;
  }, [entries]);

  const getIndicator = (value: number, metric: "mood" | "energy" | "sleep" | "stress") => {
    const numValue = parseFloat(String(value));
    
    if (metric === "stress") {
      // Para estrés, menos es mejor
      if (numValue <= 3) return { icon: ArrowDown, color: "text-success", bg: "bg-success/10", label: "Bajo" };
      if (numValue <= 6) return { icon: Minus, color: "text-warning", bg: "bg-warning/10", label: "Moderado" };
      return { icon: ArrowUp, color: "text-destructive", bg: "bg-destructive/10", label: "Alto" };
    } else {
      // Para mood, energy, sleep: más es mejor
      if (numValue >= 7) return { icon: ArrowUp, color: "text-success", bg: "bg-success/10", label: "Excelente" };
      if (numValue >= 5) return { icon: Minus, color: "text-warning", bg: "bg-warning/10", label: "Moderado" };
      return { icon: ArrowDown, color: "text-destructive", bg: "bg-destructive/10", label: "Bajo" };
    }
  };

  const moodIndicator = getIndicator(parseFloat(String(averages.mood)), "mood");
  const energyIndicator = getIndicator(parseFloat(String(averages.energy)), "energy");
  const sleepIndicator = getIndicator(parseFloat(String(averages.sleep)), "sleep");
  const stressIndicator = getIndicator(parseFloat(String(averages.stress)), "stress");

  const getPeriodLabel = () => {
    switch (period) {
      case "week":
        return "últimos 7 días";
      case "month":
        return "últimos 30 días";
      case "year":
        return "último año";
      default:
        return "últimos 30 días";
    }
  };

  return (
    <Layout>
      <div className="max-w-6xl mx-auto space-y-8 animate-fade-in pb-10"> {/* Añadido pb-10 para espacio al final */}
        <div className="text-center space-y-2">
          <div className="flex items-center justify-center gap-4 mb-2">
            <h1 className="text-4xl font-bold">Tendencias de Bienestar</h1>
          </div>
          <p className="text-muted-foreground">
            Visualiza tu progreso y descubre patrones en tu bienestar
          </p>
          <div className="flex justify-center mt-4">
            <ClearDataButton />
          </div>
        </div>

        {/* Period Selector */}
        <Tabs value={period} onValueChange={(v) => setPeriod(v as "week" | "month" | "year")} className="w-full">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-3">
            <TabsTrigger value="week">Semana</TabsTrigger>
            <TabsTrigger value="month">Mes</TabsTrigger>
            <TabsTrigger value="year">Año</TabsTrigger>
          </TabsList>

          {/* =================================================================== */}
          {/* ================ INICIO DE LA SECCIÓN MODIFICADA ================== */}
          {/* =================================================================== */}

          <TabsContent value={period} className="space-y-8 mt-8">
            {/* Stats Cards (Sin cambios) */}
            <div className="grid md:grid-cols-4 gap-4">
              {/* Card Ánimo */}
              <Card className="p-6 bg-gradient-card shadow-soft border-border">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                      <TrendingUp className="w-5 h-5 text-primary" />
                    </div>
                    <span className="text-sm font-medium text-muted-foreground">Promedio Ánimo</span>
                  </div>
                  <div className={`flex items-center gap-1 px-2 py-1 rounded-md ${moodIndicator.bg}`}>
                    <moodIndicator.icon className={`w-4 h-4 ${moodIndicator.color}`} />
                  </div>
                </div>
                <div className="flex items-baseline gap-2">
                  <p className="text-3xl font-bold text-primary">{averages.mood}/10</p>
                  <span className={`text-sm font-medium ${moodIndicator.color}`}>{moodIndicator.label}</span>
                </div>
              </Card>

              {/* Card Energía */}
              <Card className="p-6 bg-gradient-card shadow-soft border-border">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
                      <Activity className="w-5 h-5 text-accent" />
                    </div>
                    <span className="text-sm font-medium text-muted-foreground">Promedio Energía</span>
                  </div>
                  <div className={`flex items-center gap-1 px-2 py-1 rounded-md ${energyIndicator.bg}`}>
                    <energyIndicator.icon className={`w-4 h-4 ${energyIndicator.color}`} />
                  </div>
                </div>
                <div className="flex items-baseline gap-2">
                  <p className="text-3xl font-bold text-accent">{averages.energy}/10</p>
                  <span className={`text-sm font-medium ${energyIndicator.color}`}>{energyIndicator.label}</span>
                </div>
              </Card>

              {/* Card Sueño */}
              <Card className="p-6 bg-gradient-card shadow-soft border-border">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-secondary/10 rounded-lg flex items-center justify-center">
                      <Moon className="w-5 h-5 text-secondary" />
                    </div>
                    <span className="text-sm font-medium text-muted-foreground">Promedio Sueño</span>
                  </div>
                  <div className={`flex items-center gap-1 px-2 py-1 rounded-md ${sleepIndicator.bg}`}>
                    <sleepIndicator.icon className={`w-4 h-4 ${sleepIndicator.color}`} />
                  </div>
                </div>
                <div className="flex items-baseline gap-2">
                  <p className="text-3xl font-bold text-secondary">{averages.sleep}/10</p>
                  <span className={`text-sm font-medium ${sleepIndicator.color}`}>{sleepIndicator.label}</span>
                </div>
              </Card>

              {/* Card Estrés */}
              <Card className="p-6 bg-gradient-card shadow-soft border-border">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-warning/10 rounded-lg flex items-center justify-center">
                      <TrendingUp className="w-5 h-5 text-warning" />
                    </div>
                    <span className="text-sm font-medium text-muted-foreground">Promedio Estrés</span>
                  </div>
                  <div className={`flex items-center gap-1 px-2 py-1 rounded-md ${stressIndicator.bg}`}>
                    <stressIndicator.icon className={`w-4 h-4 ${stressIndicator.color}`} />
                  </div>
                </div>
                <div className="flex items-baseline gap-2">
                  <p className="text-3xl font-bold text-warning">{averages.stress}/10</p>
                  <span className={`text-sm font-medium ${stressIndicator.color}`}>{stressIndicator.label}</span>
                </div>
              </Card>
            </div>

            {/* AHORA USAMOS UN WRAPPER DE GRID */}
            {entries.length > 0 ? (
              // Usamos grid-cols-1 por defecto (móvil, apilado)
              // y lg:grid-cols-12 en pantallas grandes (desktop)
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                
                {/* Chart (3/4 de ancho en LG) */}
                <Card className="p-8 bg-gradient-card shadow-soft border-border lg:col-span-9">
                  <h2 className="text-2xl font-bold mb-6">Evolución de Indicadores</h2>
                  <ResponsiveContainer width="100%" height={400}>
                    <LineChart data={chartData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                      <XAxis 
                        dataKey="date" 
                        stroke="hsl(var(--muted-foreground))"
                        style={{ fontSize: '12px' }}
                      />
                      <YAxis 
                        domain={[0, 10]} 
                        stroke="hsl(var(--muted-foreground))"
                        style={{ fontSize: '12px' }}
                      />
                      <Tooltip 
                        contentStyle={{
                          backgroundColor: 'hsl(var(--card))',
                          border: '1px solid hsl(var(--border))',
                          borderRadius: '8px',
                        }}
                      />
                      <Legend />
                      <Line 
                        type="monotone" 
                        dataKey="Estado de Ánimo" 
                        stroke="hsl(var(--primary))" 
                        strokeWidth={2}
                        dot={{ fill: 'hsl(var(--primary))' }}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="Energía" 
                        stroke="hsl(var(--accent))" 
                        strokeWidth={2}
                        dot={{ fill: 'hsl(var(--accent))' }}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="Sueño" 
                        stroke="hsl(var(--secondary))" 
                        strokeWidth={2}
                        dot={{ fill: 'hsl(var(--secondary))' }}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="Estrés" 
                        stroke="hsl(var(--warning))" 
                        strokeWidth={2}
                        dot={{ fill: 'hsl(var(--warning))' }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </Card>

                {/* Insights (1/4 de ancho en LG) */}
                <Card className="p-8 bg-gradient-calm shadow-soft border-border lg:col-span-3">
                  <h2 className="text-2xl font-bold mb-4">Perspectivas</h2>
                  <p className="text-sm text-muted-foreground mb-4">
                    Resumen de {getPeriodLabel()}
                  </p>
                  <div className="space-y-4  text-foreground">
                    <div className="flex items-start gap-3">
                      <Info className="w-5 h-5 text-primary mt-1 flex-shrink-0"/>
                      <p>Has registrado <strong className="text-foreground">{entries.length} días</strong> en este período.</p>
                    </div>
                    {exerciseCount > 0 && (
                      <div className="flex items-start gap-3">
                         <span className="text-primary mt-1">•</span>
                        <p>Hiciste ejercicio <strong className="text-foreground">{exerciseCount} días</strong>. ¡Excelente trabajo!</p>
                      </div>
                    )}
                    {parseFloat(String(averages.mood)) < 5 && (
                      <div className="flex items-start gap-3">
                        <AlertTriangle className="w-5 h-5 text-destructive mt-1 flex-shrink-0"/>
                        <p className="text-foreground"> {/* Quitamos text-warning */}
                          Tu estado de ánimo promedio está muy bajo. Considera explorar los{" "}
                          <Link
                            to="/resources"
                            state={{ filterCategory: "meditation" }}
                            className="font-semibold underline hover:text-foreground/80 transition-colors"
                          >
                            recursos de apoyo
                          </Link>
                          .
                        </p>
                      </div>
                    )}
                    {parseFloat(String(averages.stress)) > 7 && (
                      <div className="flex items-start gap-3">
                        <AlertTriangle className="w-5 h-5 text-destructive mt-1 flex-shrink-0" />
                        <p className="text-foreground"> {/* Mantenemos el color de alerta */}
                          Tus niveles de estrés son altos. Te recomendamos practicar{" "}
                          <Link
                            to="/resources"
                            state={{ filterCategory: "stress" }}
                            className="font-semibold underline hover:text-foreground/80 transition-colors"
                          >
                            técnicas de relajación
                          </Link>
                          .
                        </p>
                      </div>
                    )}
                    {parseFloat(String(averages.energy)) < 5 && (
                      <div className="flex items-start gap-3">
                        <AlertTriangle className="w-5 h-5 text-destructive mt-1 flex-shrink-0" />
                        <p className="text-foreground"> {/* Mantenemos el color de alerta */}
                          Tus niveles de energía están bajos. Revisa los siguientes{" "}
                          <Link
                            to="/resources"
                            state={{ filterCategory: "exercise" }}
                            className="font-semibold underline hover:text-foreground/80 transition-colors"
                          >
                            recursos de apoyo
                          </Link>
                          .
                        </p>
                      </div>
                    )}
                    {parseFloat(String(averages.sleep)) < 5 && (
                      <div className="flex items-start gap-3">
                        <AlertTriangle className="w-5 h-5 text-destructive mt-1 flex-shrink-0" />
                        <p className="text-foreground"> {/* Mantenemos el color de alerta */}
                          La calidad de tu sueño necesita atención. Revisa los siguientes{" "}
                          <Link
                            to="/resources"
                            state={{ filterCategory: "sleep" }}
                            className="font-semibold underline hover:text-foreground/80 transition-colors"
                          >
                            recursos de apoyo
                          </Link>
                          .
                        </p>
                      </div>
                    )}
                  </div>
                </Card>

              </div> // Fin del wrapper del grid
            ) : (
              // "Sin datos" (Sin cambios, se muestra a ancho completo)
              <Card className="p-12 text-center bg-gradient-calm shadow-soft border-border">
                <Calendar className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Sin datos todavía</h3>
                <p className="text-muted-foreground">
                  Comienza a registrar tus entradas diarias para ver tus tendencias aquí.
                </p>
              </Card>
            )}

            {/* La sección de "Insights" original se elimina porque AHORA ESTÁ DENTRO DEL GRID */}

          </TabsContent>

        </Tabs>
      </div>
    </Layout>
  );
};

export default Dashboard;

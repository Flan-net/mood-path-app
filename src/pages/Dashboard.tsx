import { useMemo } from "react";
import Layout from "@/components/Layout";
import { Card } from "@/components/ui/card";
import { getEntriesLast30Days } from "@/utils/storage";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { TrendingUp, Calendar, Activity } from "lucide-react";

const Dashboard = () => {
  const entries = getEntriesLast30Days();

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

  return (
    <Layout>
      <div className="max-w-6xl mx-auto space-y-8 animate-fade-in">
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold">Tendencias de Bienestar</h1>
          <p className="text-muted-foreground">
            Visualiza tu progreso y descubre patrones en tu bienestar
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-4 gap-4">
          <Card className="p-6 bg-gradient-card shadow-soft border-border">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-primary" />
              </div>
              <span className="text-sm font-medium text-muted-foreground">Promedio Ánimo</span>
            </div>
            <p className="text-3xl font-bold text-primary">{averages.mood}/10</p>
          </Card>

          <Card className="p-6 bg-gradient-card shadow-soft border-border">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
                <Activity className="w-5 h-5 text-accent" />
              </div>
              <span className="text-sm font-medium text-muted-foreground">Promedio Energía</span>
            </div>
            <p className="text-3xl font-bold text-accent">{averages.energy}/10</p>
          </Card>

          <Card className="p-6 bg-gradient-card shadow-soft border-border">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-secondary/10 rounded-lg flex items-center justify-center">
                <Calendar className="w-5 h-5 text-secondary" />
              </div>
              <span className="text-sm font-medium text-muted-foreground">Días de Ejercicio</span>
            </div>
            <p className="text-3xl font-bold text-secondary">{exerciseCount}</p>
          </Card>

          <Card className="p-6 bg-gradient-card shadow-soft border-border">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-warning/10 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-warning" />
              </div>
              <span className="text-sm font-medium text-muted-foreground">Promedio Estrés</span>
            </div>
            <p className="text-3xl font-bold text-warning">{averages.stress}/10</p>
          </Card>
        </div>

        {/* Chart */}
        {entries.length > 0 ? (
          <Card className="p-8 bg-gradient-card shadow-soft border-border">
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
        ) : (
          <Card className="p-12 text-center bg-gradient-calm shadow-soft border-border">
            <Calendar className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Sin datos todavía</h3>
            <p className="text-muted-foreground">
              Comienza a registrar tus entradas diarias para ver tus tendencias aquí.
            </p>
          </Card>
        )}

        {/* Insights */}
        {entries.length > 0 && (
          <Card className="p-8 bg-gradient-calm shadow-soft border-border">
            <h2 className="text-2xl font-bold mb-4">Perspectivas</h2>
            <div className="space-y-3 text-muted-foreground">
              <p>• Has registrado <strong className="text-foreground">{entries.length} días</strong> en los últimos 30 días.</p>
              {exerciseCount > 0 && (
                <p>• Hiciste ejercicio <strong className="text-foreground">{exerciseCount} días</strong>. ¡Excelente trabajo!</p>
              )}
              {parseFloat(String(averages.mood)) < 5 && (
                <p className="text-warning">• Tu estado de ánimo promedio está por debajo de 5. Considera explorar los recursos de apoyo.</p>
              )}
              {parseFloat(String(averages.stress)) > 7 && (
                <p className="text-destructive">• Tus niveles de estrés son altos. Te recomendamos practicar técnicas de relajación.</p>
              )}
            </div>
          </Card>
        )}
      </div>
    </Layout>
  );
};

export default Dashboard;

import { AlertCircle, Phone, MapPin, HeartHandshake } from "lucide-react";
import Layout from "@/components/Layout"; 
import { Card } from "@/components/ui/card"; 
import { Button } from "@/components/ui/button"; 

interface UrgentHelpPageProps {}

const UrgentHelpPage: React.FC<UrgentHelpPageProps> = () => {
  return (
    <Layout>
      <div className="container mx-auto py-10 px-4 md:px-6">

        <div className="text-center space-y-2 mb-8">
          <h1 className="text-4xl font-bold">Ayuda Urgente</h1> 
          <p className="text-muted-foreground">
            Encuentra asistencia profesional inmediata en momentos de crisis. 
          </p>
        </div>

        <Card className="p-8 bg-destructive/5 border-destructive/20 shadow-lg mb-8">
          <div className="flex items-start gap-4">
            <AlertCircle className="w-8 h-8 text-destructive flex-shrink-0 mt-1" />
            <div className="space-y-2">
              <h3 className="text-xl font-semibold text-destructive">Línea de Crisis Nacional</h3>
              <p className="text-foreground">
                Si estás experimentando una crisis emocional, tienes pensamientos de autolesión, o sientes <strong>un peligro inminente</strong>, por favor busca ayuda profesional <strong>inmediatamente</strong>.
              </p>
              <p className="text-xl font-bold text-destructive mt-3">
                Llama a la línea de atención en crisis: <a href="tel:*4141" className="underline hover:no-underline">*4141</a>
              </p>
              <p className="text-sm text-muted-foreground pt-2">
                Recuerda: pedir ayuda es un acto de valentía, no de debilidad. Estás a salvo aquí.
              </p>
            </div>
          </div>
        </Card>

        <h2 className="text-2xl font-semibold mb-4 text-foreground mt-8">
          Contactos de Emergencia
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <Card className="p-6">
            <HeartHandshake className="w-6 h-6 text-primary mb-3" />
            <h4 className="font-semibold text-lg mb-2">Fono Salud Responde (24/7)</h4>
            <p className="text-muted-foreground mb-3">
              Para orientación y apoyo en temas de salud las 24 horas del día, los 365 días del año.
            </p>
            <Button asChild variant="outline" className="w-full">
              <a href="tel:600 360 7777" target="_blank" rel="noopener noreferrer">
                <Phone className="w-4 h-4 mr-2" /> Llamar al 600 360 7777
              </a>
            </Button>
          </Card>

          <Card className="p-6">
            <Phone className="w-6 h-6 text-primary mb-3" />
            <h4 className="font-semibold text-lg mb-2">Servicios de Emergencia Médica</h4>
            <p className="text-muted-foreground mb-3">
              Si necesitas una ambulancia o ayuda médica inmediata por daño físico.
            </p>
            <Button asChild variant="outline" className="w-full">
              <a href="tel:131" target="_blank" rel="noopener noreferrer">
                <Phone className="w-4 h-4 mr-2" /> Llamar al 131 (Ambulancia)
              </a>
            </Button>
          </Card>

          <Card className="p-6">
            <MapPin className="w-6 h-6 text-primary mb-3" />
            <h4 className="font-semibold text-lg mb-2">Hospitales y Centros de Urgencia</h4>
            <p className="text-muted-foreground mb-3">
              Encuentra centros de urgencia psiquiátrica o el hospital más cercano.
            </p>
            <Button asChild variant="outline" className="w-full">
              <a href="https://maps.google.com/?q=urgencia+psicologica" target="_blank" rel="noopener noreferrer">
                <MapPin className="w-4 h-4 mr-2" /> Abrir Mapa de Ayuda
              </a>
            </Button>
          </Card>
        </div>
        
        <div className="mt-10 p-4 bg-muted rounded-lg border border-border">
          <p className="text-sm text-muted-foreground">
            <strong>Nota Importante:</strong> Esta aplicación es una herramienta de apoyo y <strong>no reemplaza</strong> el diagnóstico, tratamiento o consejo de un profesional de la salud mental. Si tu vida o la de otros corre peligro, utiliza los números de emergencia proporcionados.
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default UrgentHelpPage;
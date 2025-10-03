import { Button } from "@/components/ui/button";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Trash2 } from "lucide-react";
import { toast } from "sonner";

const ClearDataButton = () => {
  const handleClearData = () => {
    localStorage.removeItem("wellness_entries");
    toast.success("Datos eliminados", {
      description: "Todos los registros anteriores han sido borrados."
    });
    window.location.reload();
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="destructive" size="sm" className="gap-2">
          <Trash2 className="w-4 h-4" />
          Limpiar Datos
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>¿Estás seguro?</AlertDialogTitle>
          <AlertDialogDescription>
            Esta acción eliminará permanentemente todos tus registros de bienestar.
            No podrás recuperar esta información.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction onClick={handleClearData} className="bg-destructive hover:bg-destructive/90">
            Eliminar Todo
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ClearDataButton;
